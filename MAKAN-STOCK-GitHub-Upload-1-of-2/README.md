# MAKAN STOCK

**Bilingual inventory and warehouse management, built by Makan at MAKAN LAB.**

[فارسی](README.fa.md) · [Website](https://makanlab.tech/) · [Downloads](https://github.com/makan20042002/makan-stock/releases) · [Persian manual](docs/MAKAN-STOCK-Guide-fa.pdf)

![MAKAN STOCK dashboard](docs/light.png)

MAKAN STOCK helps small teams manage daily stock tasks while providing advanced warehouse workflows in a simple/pro interface. It runs locally on Windows with a bundled Node.js runtime and SQLite database. A separately configured HTTPS deployment supports access from other devices.

**Version:** 1.3.0 · **License:** MIT for original application code · **Windows builds:** Windows 10/11 x64

## Downloads

Open [Releases](https://github.com/makan20042002/makan-stock/releases) and choose:

| File | Purpose |
| --- | --- |
| `MAKAN-STOCK-Setup-1.3.0-Windows-x64.exe` | Per-user Windows installer, shortcuts and uninstaller |
| `MAKAN-STOCK-1.3.0-Windows-x64-Portable.zip` | Extract completely and run without installation |
| `MAKAN-STOCK-1.3.0-Source.zip` | Versioned source distribution without runtime binaries or user data |
| `MAKAN-STOCK-Guide-fa.pdf` | 35-page Persian user manual |
| `SHA256SUMS-MAKAN-STOCK-1.3.0.txt` | Download verification checksums |

The installer includes the Persian PDF and offers to open it by default on the interactive completion page. A PDF reader or configured browser is required. The installer is **not commercially code-signed**.

## Main features

- **Catalog:** products, categories, brands, units/conversions, variants, images, custom attributes, barcodes and price lists.
- **Stock:** multiple warehouses and locations, movement history, reservations, FIFO/FEFO, serials, batch/lot, expiry, quarantine, reorder thresholds and inventory valuation with manual exchange rates.
- **Warehouse operations:** transfers/in-transit stock, partial destination receipts, location capacity rules, stock counts, blind counts, independent recounts and discrepancy approval.
- **Purchasing:** suppliers, purchase requests and independent approval, recorded supplier quotations, purchase orders, partial goods receipts and supplier returns.
- **Fulfillment:** customers, sales orders/backorders, reservations, barcode-verified picking, package contents and weights, partial dispatch, returns and inspection before stock release.
- **Reporting:** inventory/movement/aging/low-stock reports, saved filters, CSV/XLSX import/export, scheduled daily disk reports, notifications and reminders.
- **Access:** individual accounts, predefined/custom roles, granular stock/fulfillment permissions, warehouse restrictions, activity history and audit-chain verification.
- **Experience:** Persian/English, RTL/LTR, Solar Hijri/Gregorian display, timezone preferences, light/dark themes, simple/pro modes and responsive warehouse UI.
- **Integration and resilience:** API keys, signed webhook outbox, backup/restore, PWA shell and a limited offline operation queue with conflict checks.

## Get started on Windows

**Installer:** run Setup, choose your folder, then start MAKAN STOCK from the shortcut.

**Portable:** extract the whole ZIP into a writable folder and run `MAKAN-STOCK.exe`. Do not run it from inside the archive. To stop the local background service, run `Stop-AnbarOne.cmd`; closing the browser alone does not stop it.

On first launch, create your owner account and organization. Sample data is optional. **No default credentials or customer database are shipped.** Local operation does not require Internet access, paid hosting or a separate database installation.

## Where is the data?

| Mode | Database |
| --- | --- |
| Default installed | `%LOCALAPPDATA%\AnbarOne\data\inventory.sqlite` |
| Portable | `data\inventory.sqlite` beside the application |

The legacy `AnbarOne` directory and some API/file identifiers are retained for compatibility. The app's Installation & storage page shows the actual path. Backup snapshots and scheduled reports live under `data/backups` and `data/reports`.

Back up before upgrading. Upgrade preserves existing data; uninstall preserves user-generated data. JSON backup contains business data and does not migrate user accounts. For a full file transfer, stop the service and copy the entire `data` folder. The application does not internally encrypt the SQLite file.

## Multiple users and deployment

There is no enforced per-seat license limit. Accounts have server-side role and warehouse authorization. This **does not imply unlimited concurrent capacity**: no enterprise load benchmark or guaranteed user count is published.

Default startup binds to loopback on the office PC. Multi-device access requires a shared server with configured trusted HTTPS, allowed hosts and appropriate network access. Two portable copies do not automatically synchronize. Copying only the frontend to static hosting is insufficient. See [deployment](docs/DEPLOYMENT.fa.md) and [architecture](docs/ARCHITECTURE.md).

## Status and boundaries

The [72-feature matrix](docs/FEATURES.csv) records **53 implemented, 14 partial, 4 planned and 1 deliberately excluded**. Labels describe the documented scope, not parity with enterprise products.

Partial capabilities include SKU-count-based location capacity/putaway, location-sorted picking rather than spatial optimization, simple supplier analytics, browser-dependent camera scanning, per-package contents without carrier labels, scheduled CSV files without email, limited workflow rules, unvalidated external webhook delivery and four offline queue operations that stop on conflicts.

Native mobile apps, multi-company/SSO/MFA, carrier/email connectors, statistical forecasting/AI and kits/manufacturing are not complete. Enterprise load, high availability and a real trusted-certificate multi-device rollout are not certified. **Accounting, ledger, tax and Iranian tax-system integration are intentionally outside scope.**

## Run and test the source

Use official Node.js **22.13+** with `node:sqlite` support; release tested on Node 22.23.2. The server needs no npm packages.

```sh
npm start
npm test
npm run check
```

Windows `npm start` launches the local server and opens the default browser. On other systems run `node src/server.mjs` and manually open the loopback URL; the bundled desktop launcher is Windows-specific. Use `ANBAR_DATA` for isolated test databases.

**Release verification:** 65 automated tests passed. The delivered source archive was extracted and its 65 tests passed independently. Actual Windows installer startup, running-server upgrade, account/product preservation, uninstall data retention and extracted portable persistence were tested. See [verification](docs/VERIFICATION.md).

## Build the Windows installer

Place the official Node x64 executable and license under `runtime/node.exe` and `runtime/NODE-LICENSE.txt`. Install official Inno Setup 6.7+ and use a Windows .NET Framework C# compiler:

```powershell
./scripts/build-windows.ps1 -InnoCompiler 'C:/path/to/ISCC.exe'
```

The source includes installer definitions, logo assets and the PDF. Optional manual rebuilding is described in [CONTRIBUTING.md](CONTRIBUTING.md).

## Documentation and contribution

- [Persian manual](docs/MAKAN-STOCK-Guide-fa.pdf) and [editable manual text](docs/Manual-fa.md)
- [API](docs/API.md), [feature status](docs/FEATURES.csv), [changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md) and [security reporting](SECURITY.md)

For bug reports, include version, steps, expected/actual behavior and a redacted screenshot if useful. Never post customer databases, passwords, API keys or private network configurations.

## Creator and license

**Created by Makan / MAKAN LAB**  
Website: https://makanlab.tech/  
Public contact: makan20042002@gmail.com

Original application code is available under the [MIT License](LICENSE). Bundled components retain their respective licenses; see [third-party notices](THIRD-PARTY-NOTICES.txt). This project is supplied under the terms and warranty disclaimer of its licenses.
