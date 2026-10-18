# MAKAN STOCK 1.3.0

**Persian/English inventory and warehouse management by Makan / MAKAN LAB.**

This release provides a Windows installer, a portable distribution, the original application source under MIT and a bundled 35-page Persian user manual.

## Download

| Asset | Choose this if… |
| --- | --- |
| `MAKAN-STOCK-Setup-1.3.0-Windows-x64.exe` | You want a per-user Windows installation with shortcuts and an uninstaller. |
| `MAKAN-STOCK-1.3.0-Windows-x64-Portable.zip` | You want to extract and run without installation. |
| `MAKAN-STOCK-1.3.0-Source.zip` | You want the versioned application source and build definitions. |
| `MAKAN-STOCK-Guide-fa.pdf` | You want the complete Persian guide separately. |
| `SHA256SUMS-MAKAN-STOCK-1.3.0.txt` | You want to verify the downloads. |

**Windows 10/11 x64.** Node and SQLite are included in the Windows builds. No hosting or Internet connection is required for local use. The installer is not commercially code-signed.

## What's included

- Product catalog, variants, categories, units, pricing and multiple warehouses/locations.
- Stock movements, reservations, low-stock rules, serial/lot/expiry and FIFO/FEFO.
- Purchase requests/approvals, supplier quotes, purchase orders and partial receipts/returns.
- Sales/backorders, barcode-verified picking, per-package contents/weights, partial dispatch and inspected returns.
- Blind stock counts, independent recount and discrepancy approval.
- Reports, CSV/XLSX import/export, daily disk reports, reminders and notification rules.
- Users, custom roles, granular fulfillment permissions and warehouse scope.
- Persian/English, RTL/LTR, Solar Hijri/Gregorian display, light/dark and simple/pro modes.
- Backup/restore, API keys, signed webhook outbox, responsive PWA/mobile UI and limited offline queuing.

## Changes in 1.3

- New MAKAN STOCK name and MAKAN LAB-inspired logo.
- Real Windows Setup.exe, native launcher and data-preserving uninstall/upgrade.
- Persian manual bundled offline and offered at installer completion.
- Fine-grained stock and fulfillment permissions.
- Record-version checks in principal edit forms to reject stale updates.
- Per-package line quantities with exact order-total reconciliation.
- Reasoned rejection of purchase/transfer requests.
- Pause/resume management for automation rules and daily report schedules.
- Corrected scheduled CSV escaping and updated PWA asset cache.

## Verification

**65 automated tests passed, 0 failed.** The extracted source distribution passed the same suite. Actual installer/upgrade/uninstall and extracted portable startup, persistence and PDF availability were tested on Windows x64. See `docs/VERIFICATION.md`.

## Upgrade and data

Back up first. Stop the previous local service and install into the same directory. The default installation keeps the compatible legacy path `%LOCALAPPDATA%\AnbarOne`; the database is under `data\inventory.sqlite`. Upgrade and uninstall preserve existing user data. Portable folders have independent databases.

Create your owner account on first launch; no default credentials or customer database are included. Closing the browser does not stop the service; use the Stop shortcut/CMD.

## Scope and limitations

The documented matrix lists 53 implemented, 14 partial, 4 planned and 1 deliberately excluded feature. No enterprise capacity guarantee is claimed. Shared multi-device access requires trusted HTTPS configuration; native mobile apps, multi-company/SSO/MFA, carrier/email connectors, forecasting/AI and manufacturing are not complete. Offline queuing is limited and stops on conflicts. Accounting, ledger, tax and Iranian tax-system integration are excluded.

---

## راهنمای فارسی انتشار

**ماکان استاک ۱.۳**، ساخته‌شده توسط **ماکان / MAKAN LAB**، نرم‌افزار مدیریت انبار و موجودی فارسی و انگلیسی با مجوز MIT است.

- برای نصب ویندوز فایل **Setup.exe** را دریافت کنید.
- برای استفاده بدون نصب، فایل **Portable.zip** را کامل استخراج و `MAKAN-STOCK.exe` را اجرا کنید.
- سورس‌کد، راهنمای فارسی ۳۵ صفحه‌ای و فایل هش نیز در Assets همین انتشار قرار دارند.
- در اولین اجرا حساب مدیر ساخته می‌شود؛ حساب یا رمز آماده در بسته وجود ندارد.
- برای اجرای محلی، اینترنت و هاست لازم نیست. داده‌ها در SQLite روی همان دستگاه نگه‌داری می‌شوند.
- قبل از ارتقا پشتیبان بگیرید. برای استفاده چند رایانه، راه‌اندازی سرور مشترک HTTPS لازم است.
- همه قابلیت‌های سازمانی تکمیل نشده‌اند؛ جدول وضعیت امکانات و محدودیت‌ها در راهنما و داخل برنامه آمده است.

Website: https://makanlab.tech/  
Contact: makan20042002@gmail.com  
Original application source: **MIT**. Third-party licenses are included.
