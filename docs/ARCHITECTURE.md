# Portable architecture

Start CMD → bundled Node x64 → launcher → loopback HTTP server → browser UI. The launcher starts a hidden detached process, opens the browser, and exits. Repeated Start reopens the running instance. Stop uses a secret-authenticated shutdown endpoint. An available port is selected. No firewall rule, Windows service, cloud hosting or external account is created.

The domain aggregate is versioned JSON in SQLite with BEGIN IMMEDIATE/rollback. Identity, sessions, API keys, audit chain, hooks and outbox use separate tables. This is for a small local instance; enterprise persistence must migrate to relational tables. Browser and server domain files match; all mutations authorize and execute on the server. Failed commands leave no partial changes. Idempotency binds canonical payload and actor.

Stock layers identify product/warehouse/bin/lot/serial/expiry/receipt time/status. FIFO/FEFO allocates only available unexpired stock. Reservations point to layers; shipment/return quantities reconcile to order lines. Returns enter quarantine. Transfers retain remaining transit allocations. Counts compare snapshotted expected balances before approval. JSON restore checks stock, reservations, serials and transit reconciliation.

## Security

Loopback binding, Host/origin checks, CSP, scrypt password hashes, hashed session/API tokens, HttpOnly SameSite=Strict cookies, eight-hour sessions, role/warehouse authorization, throttled authentication and owner-only browser management. Password change revokes sessions. No analytics/telemetry/cloud sync; all UI assets and barcode libraries are local. Data is not encrypted at rest by the application.

Roles: owner all; manager catalog/stock/count/transfer/purchase/sales/contacts/reports/reminders; warehouse stock/transfer/count-create/reports; purchasing purchase/contacts/reports; sales sales/contacts/reports; viewer read-only. Warehouse scope applies to reads and writes; catalog, pricing and contacts are shared in the local company. Predefined roles and owner-defined custom capability roles are supported. Custom roles cannot grant wildcard/admin permissions.

Audit chain hashes previous hash + exact event JSON in SQLite. It detects modification without chain reconstruction; an attacker with full database control can recompute it. JSON restore retains accounts and the server audit chain. Complete VACUUM INTO snapshots preserve all tables and are created at setup/start and every six hours; fourteen retained. JSON backup only transfers operational data.

Webhook events enter an outbox inside the domain transaction. HTTPS endpoints use HMAC-SHA256(timestamp+'.'+body), stable event IDs, five bounded retry attempts and persisted delivery status. DNS is validated and pinned per request; private/local destinations and redirects are rejected. Delivery is at least once; receivers deduplicate. Real external delivery was not tested. Reminders poll every ten seconds while the server runs; overdue entries are handled on restart. No email/push service is shipped.

## Enterprise migration

Keep modules Catalog, Warehouse/Bin, Stock Ledger, Allocation, Procurement, Fulfillment, Tracking, Counts, Identity, Notifications, Reporting and Integrations. Move from aggregate JSON to tenant-scoped relational repositories under single transaction boundaries. Target tables: tenants/memberships; products/categories/brands/units/conversions/barcodes/prices; warehouses/location_tree; lots/serials; stock_ledger/balances/receipt_layers; reservations/allocations; purchase_orders/lines/receipts; sales_orders/lines/picks/packages/shipments/returns; transfers/lines/receipts; count_sessions/lines/approvals; users/roles/permissions/grants; audit; reminders/notifications; outbox/deliveries; idempotency/import/backup jobs.

Use fixed precision quantities and Decimal/minor units for money; PostgreSQL conditional versions/locks in deterministic balance order; identity-derived tenant; immutable posted documents with corrective entries; TLS/SSO/MFA before LAN/cloud. Separate import/report/webhook/forecast workers as load grows. Load/recovery/tenant-isolation certification is required before enterprise deployment.

Forecasting is future work: capture demand/stockouts/lead times, begin deterministic replenishment, benchmark models and require approval for generated orders. No AI is included. There is no accounting, tax or financial ledger module.


## Version 1.1 additions

Domain extension commands add hierarchical locations, internal bin moves, supplier returns, per-warehouse replenishment rules, alternate-unit conversion, product metadata and saved reports. State schema version 2 is upgraded non-destructively with optional arrays/defaults on load and restore. User appearance/language/calendar preferences have a separate SQLite table and survive port changes/restart. /api/system exposes local storage paths to the owner only. Install-AnbarOne.cmd performs a per-user installation with shortcuts, preserving existing destination data; it is not an MSI or signed Setup.exe. The portable edition remains loopback-only.

## Version 1.2 additions

The premium UI uses a six-group navigation, task-first dashboard, universal product/order search, review-before-commit forms, session drafts, responsive list cards and a dedicated mobile warehouse view. Operational additions include backorders, verified picking, package weights, independent recount/approvals, quality inspection, Cartesian variants, category trees, atomic bulk edits, native XLSX, supplier quotes, receipt-layer costs and manual FX references. The complete status matrix is maintained in dist/features.mjs and docs/Feature-Review-fa.html.

A service worker caches only the application shell, never API responses. A per-browser last-user snapshot and account-isolated pending queue provide limited offline operation. Queued writes are not shown as committed stock changes; server-side instance/revision checks and idempotency gate replay. Conflicts require manual review. Restore rotates the instance ID. Logout clears the current snapshot and that account's pending queue after warning about unapplied operations.

Daily CSV report schedules and low-stock/expiry notification rules run while the server is active. Network mode is opt-in and requires an existing local owner, TLS certificate/key and explicit public host names. Default portable operation still binds loopback. It does not configure DNS, firewall or certificates. Multi-device HTTPS deployment and enterprise load have not been certified.
