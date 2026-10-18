# MAKAN STOCK API 1.3

Default origin is the loopback URL printed by Start and stored in data/running.json. An optional HTTPS network configuration is described in DEPLOYMENT.fa.md. JSON uses UTF-8; request limit 12MB. No CORS access is provided. State-changing requests enforce same-origin checks and authorization.

GET /api/health returns version/setup. POST /api/setup creates the first owner. POST /api/login accepts username/password. GET /api/me and /api/state return identity and warehouse-scoped aggregate state. POST /api/logout and /api/password manage sessions. GET/POST /api/preferences persist per-user display preferences. GET /api/system is owner-session-only and reports actual data paths and localOnly status.

POST /api/actions accepts a domain command and returns scoped committed state. requestId provides actor-and-payload-bound idempotency. Optional expectedRevision rejects stale operations with HTTP 409; optional instanceId rejects commands from another/restored workspace. Offline clients must supply both. An exact repeat with the same idempotency key is accepted after a successful commit. Validation failure is atomic.

New command types include bulk_products, variants_generate, category_parent, location_capacity, transfer_request, transfer_request_approve, transfer_policy, purchase_request, purchase_request_approve, purchase_request_order, supplier_quote, order_reserve, pick_scan, quality_inspect, count_recount, custom_role, exchange_rate, report_schedule and automation_rule. Their field shapes and validation are in src/core.mjs and src/extensions.mjs. All actions enforce authorization server-side. Custom roles accept only the documented domain capabilities, never wildcard/admin grants. Request approval and recount reject the originating operator.

Owner-session endpoints: GET/POST /api/users, /api/keys and /api/hooks; GET /api/audit/verify and /api/backup; POST /api/snapshot and /api/restore. Restore verifies the checksum and owner password, creates a safety snapshot, preserves accounts and rotates the workspace instance ID. API keys cannot use owner-only endpoints. Keys are scoped read/write and to a user role and allowed warehouses.

GET /api/v1/products, /warehouses, /locations, /stock, /movements, /orders, /transfers and /contacts accept cursor and limit (max200), returning items and nextCursor. POST /api/v1/actions uses the same action contract. Send Authorization: Bearer <key>.

GET /api/scheduled-reports lists report files for the signed-in account. GET /api/scheduled-report?file=<encoded file> downloads only that account's generated CSV. These are user-session endpoints. Schedules generate daily while the server runs; email is not sent.

Webhooks require a public HTTPS destination on port443, reject private IP destinations, and use a durable SQLite outbox with up to five retries. Headers include x-anbar-event-id, x-anbar-timestamp and x-anbar-signature; the signature is HMAC-SHA256(secret, timestamp+'.'+JSON body). No real external receiver was tested in this release.

Errors: 400 validation, 401 sign-in required, 403 permission denial, 409 setup/workspace/revision conflict, 429 login/password throttling. The server is a single-process SQLite implementation; distributed multi-writer replication is not implemented.

Version 1.3 adds optional expectedRecordVersion for product_update, master_update, contact_update, location_update and reorder_rule; stale edits return HTTP 409. Legacy callers omitting it remain accepted. Granular capabilities are exported as grantable from extensions.mjs. New actions: purchase_request_reject, transfer_request_reject, automation_toggle, report_schedule_toggle. Pack packages may include items:[{index,qty}]; totals must match each order line.
