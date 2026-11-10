This repo is a free static-JSON API for the ISO 3166-2 standard — all 5,046 country subdivisions
(states, provinces, districts and the like) across 200 countries, each with its ISO code, verbatim
name, subdivision type and parent country code. `scripts/build.js` fetches the Debian iso-codes
derived database from
https://raw.githubusercontent.com/sokil/php-isocodes-db/master/databases/iso_3166-2.json and
regenerates `data/subdivisions.json` plus the `api/v1/` tree (full file, country index and one file
per country); the build is deterministic (byte-identical output for unchanged source), and
`.github/workflows/update.yml` runs it monthly and commits only when the data changed. GitHub
Pages serves the result at https://chirag127.github.io/iso-3166-2-api/. Never edit the JSON under
`data/` or `api/v1/` by hand — regenerate with the script.
