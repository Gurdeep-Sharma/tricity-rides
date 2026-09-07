# Legacy PostgreSQL migrations

Kept for reference only. Nothing here runs.

The project moved from PostgreSQL to MongoDB. Prisma's MongoDB connector has no
migration engine — the schema is applied with `prisma db push` instead of
`prisma migrate`, so there is no migration history to continue.

Prisma refuses to run while a `prisma/migrations` directory declares a different
provider than `schema.prisma` (error P3019), which is why this folder was renamed
rather than left in place.

`migration.sql` is the Postgres DDL for the same `Lead` model that
`prisma/schema.prisma` still describes, so it holds nothing that the schema does
not. Delete this folder whenever you no longer want the record.
