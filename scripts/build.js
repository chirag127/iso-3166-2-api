#!/usr/bin/env node
// Regenerates data/ and api/v1/ from the ISO 3166-2 subdivision database.
// No timestamp in the output: unchanged source data must produce byte-identical
// files, or the "commit only if changed" step in update.yml never settles.
'use strict';

const fs = require('node:fs');
const path = require('node:path');

// Debian iso-codes derived database — the authoritative machine-readable
// ISO 3166-2 table (same data Debian ships in the iso-codes package).
const SOURCE_URL =
  'https://raw.githubusercontent.com/sokil/php-isocodes-db/master/databases/iso_3166-2.json';
const ROOT = path.join(__dirname, '..');

async function main() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${SOURCE_URL}`);
  }
  const source = await res.json();

  const entries = source['3166-2'];
  if (!Array.isArray(entries)) {
    throw new Error('Unexpected source shape: missing "3166-2" array');
  }

  const records = entries.map((e) => ({
    code: e.code,
    name: e.name,
    type: e.type,
    // The parent country is not a separate field in the source; it is the
    // ISO 3166-1 alpha-2 prefix of the subdivision code (e.g. IN-KA → IN).
    country: e.code.split('-')[0],
  }));

  // Bucket per parent country, one file each.
  const byCountry = new Map();
  for (const record of records) {
    if (!byCountry.has(record.country)) byCountry.set(record.country, []);
    byCountry.get(record.country).push(record);
  }

  const index = [];
  for (const [country, list] of byCountry) {
    index.push({ country, file: `subdivisions/${country}.json`, count: list.length });
  }
  index.sort((a, b) => a.country.localeCompare(b.country));

  const write = (rel, data) => {
    const file = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  };

  const document = { generatedFrom: SOURCE_URL, count: records.length, records };
  write('data/subdivisions.json', document);
  write('api/v1/subdivisions.json', document);
  write('api/v1/subdivisions/index.json', { generatedFrom: SOURCE_URL, countries: index });
  for (const [country, list] of byCountry) {
    write(`api/v1/subdivisions/${country}.json`, {
      generatedFrom: SOURCE_URL,
      country,
      count: list.length,
      subdivisions: list,
    });
  }

  const types = {};
  for (const r of records) types[r.type] = (types[r.type] || 0) + 1;
  const typeKinds = Object.keys(types).length;
  console.log(
    `iso-3166-2: ${records.length} records written; ` +
      `${byCountry.size} countries; ${typeKinds} subdivision types; ` +
      `country files: ${byCountry.size}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
