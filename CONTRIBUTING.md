# Contributing

Use Node 22.13+ and run npm test and npm run check. Preserve src/core.mjs = dist/core.mjs and src/extensions.mjs = dist/extensions.mjs. Test data must be isolated using ANBAR_DATA. Never commit data/, network.json, credentials or private keys. Update English/Persian labels, feature status and the manual when behavior changes.

Optional Persian PDF rebuild on Windows: install scripts/manual-requirements.txt, then run python scripts/build-manual.py. It embeds system Tahoma fonts; a font installation with embedding rights is required. For Windows Setup, see README.md.
