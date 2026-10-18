# MAKAN STOCK 1.3.0 — verification

Tested 2026-10-18 on Windows x64, Node 22.23.2, bundled SQLite.

## Automated application checks

`node --test tests/*.test.mjs`: **65 passed, 0 failed**.

Coverage: FIFO/FEFO, expired/quarantined stock exclusions, serial uniqueness and in-transit tracking, reservations, partial purchases/dispatch/returns, stock conservation, atomic failures, idempotency, warehouse-scoped authorization, count approval/staleness, JSON checksum/restore/session behavior; variants and category cycles, bulk import, reorder/location rules, purchase and transfer approval separation, supplier quotes, layer cost and currency conversion, scanned picking, package weights and per-package line reconciliation, independent recount and return inspection, limited offline queue conflicts and user isolation, real XLSX round trips, API/session scopes, generated CSV ownership and automation, network configuration refusal gates.

New release checks cover record-version edit conflicts (409), granular receive-only permissions preventing issue/dispatch, package-total rejection and two-package success, and rendering automation/about views against a fresh workspace. Shared src/dist domain files have identical SHA256 hashes. JavaScript syntax checks pass.

## Browser verification

Isolated sample database; original user's 1.2 data untouched. Confirmed login, Persian/English direction, light/dark design, new MAKAN STOCK icon and branding, about/contact/license links, manual URL, creation of an automation rule, and pause state persisted after confirmation. Updated dashboard and about screenshots are actual application captures. Earlier 1.2 UI workflows were checked for receipt review/commit, barcode-verified picking, parcel weight, valuation and XLSX; these remain covered in domain/API regression tests.

## Windows installer and portable acceptance

Real Inno Setup installer compiled with embedded x64 Node runtime, per-user privileges, bilingual messages, graphical branding and native C# launcher. In an isolated directory containing spaces, tested: actual silent installation, native executable startup, owner setup, installed data path, PDF response MIME/body, process reuse, upgrade while local server was running, preservation of account and destination-only product, audit verification, stop, and actual uninstall preserving SQLite. Silent tests do not open the manual; the interactive completion-page manual action is enabled by default and the file is bundled.

Portable ZIP is tested after extraction in a separate folder for native launcher start, first setup, receive/stock persistence, PDF/license availability and restart. Release archives contain no data folder, credentials, private network settings or database. Source excludes Node binaries and generated executables.

## Persian manual and limitations

35-page PDF generated with embedded fonts and Persian shaping; all pages rendered to a contact sheet and representative cover, contents, dense workflow and appendix pages inspected for clipping and legibility. Full source text is provided.

No claim of enterprise certification, a guaranteed concurrent-user capacity, penetration testing, production recovery certification, encrypted database, physical scanner/camera compatibility, native mobile apps, or a trusted-certificate multi-device rollout. No real carrier/email integration or external public webhook receiver was tested. The 72-feature matrix retains **53 implemented, 14 partial, 4 planned and 1 intentionally excluded**. The installer is a real EXE but has no commercial digital signature. Publishing/uploading is left to the project owner.
