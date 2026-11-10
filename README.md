# ISO 3166-2 Subdivisions API

All 5,046 ISO 3166-2 country subdivisions — every state, province, region, district and
municipality across 200 countries — served as free static JSON.

No authentication. No server. No rate limit. The committed JSON is the database. Refreshed
automatically by GitHub Actions from the iso-codes database.

    curl https://chirag127.github.io/iso-3166-2-api/api/v1/subdivisions.json

## What you get

| Field | Example | Notes |
|---|---|---|
| `code` | `"IN-KA"` | The ISO 3166-2 code: two-letter country prefix plus 1–3 alphanumeric subdivision suffix |
| `name` | `"Karnātaka"` | Subdivision name, quoted verbatim from the source (including diacritics) |
| `type` | `"State"` | Subdivision category, quoted verbatim — 109 distinct types across the dataset |
| `country` | `"IN"` | ISO 3166-1 alpha-2 code of the parent country (the code prefix) |

## Endpoints

| Endpoint | Description | Size |
|---|---|---|
| `GET /api/v1/subdivisions.json` | All 5,046 records | ~570 KB |
| `GET /api/v1/subdivisions/index.json` | Country index: file name and record count per country | ~10 KB |
| `GET /api/v1/subdivisions/{country}.json` | One country per file, e.g. `IN.json` (36 records) or `US.json` (57 records) | 200 files |
| `GET /data/subdivisions.json` | Same data as above (source of truth for the repo) | ~570 KB |

## How it stays fresh

The `update.yml` workflow runs monthly, fetches the iso-codes
[iso_3166-2.json](https://raw.githubusercontent.com/sokil/php-isocodes-db/master/databases/iso_3166-2.json)
database, regenerates the JSON and commits only when the data changed. GitHub Pages serves the
result.

## Data source and accuracy

The source is the [iso-codes](https://salsa.debian.org/iso-codes-team/iso-codes) subdivision
database as published by the
[php-isocodes-db](https://github.com/sokil/php-isocodes-db) project, which mirrors the
Debian `iso-codes` package. It tracks the official ISO 3166-2 standard maintained by the
International Organization for Standardization. All 5,046 entries are included: 1,181
provinces, 646 districts, 517 municipalities, 474 regions, 279 states and 104 further
categories, covering 200 parent countries. Names are carried verbatim, including diacritics.

## Limits, stated plainly

- Subdivision `type` strings are the source's English labels (e.g. "Land", "Voivodship") — they are not normalised into a smaller enum, so there are 109 distinct values.
- Codes reflect the current ISO table only; no history of retired codes is included.
- Names are transliterated per the ISO standard, so some may differ from a country's local spelling.
- The ISO standard is updated irregularly, so the monthly workflow may go many runs without a commit.

## Licence

Data: the iso-codes database is published under the GNU Lesser General Public License
2.1 or later; this API republishes it with attribution. Code: MIT.

---

## About the author

**Chirag Singhal** — building free, open APIs and tools. Everything here is free, no
authentication, no rate limits, no telemetry. If it saves you time and you want to work
together, that is exactly what this is for.

- **Email — the fastest way to reach me:** [chirag@oriz.in](mailto:chirag@oriz.in)
- **GitHub:** [github.com/chirag127](https://github.com/chirag127)
- **LinkedIn:** [linkedin.com/in/chirag127](https://www.linkedin.com/in/chirag127/)
- **X:** [x.com/singhal127](https://x.com/singhal127)
- **YouTube:** [@ChiragSinghal127](https://www.youtube.com/@ChiragSinghal127)
- **Instagram:** [chiragsinghal127](https://www.instagram.com/chiragsinghal127/)
- **Reddit:** [Far_Macaron_9910](https://www.reddit.com/user/Far_Macaron_9910/)
- **Buy me a coffee:** [buymeacoffee.com/chirag127](https://buymeacoffee.com/chirag127)

**Hiring?** I build developer tooling, data APIs and web platforms. Email me — I reply to
everything.
