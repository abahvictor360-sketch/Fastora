import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Hand-written: `payload migrate:create` tried to regenerate the entire schema
// from scratch here because the two prior migrations (brand_palette,
// tags_and_roles) were committed without their drizzle snapshot .json files,
// so the generator had no baseline newer than the very first migration. This
// migration only does the one thing actually needed — add the `demo` role to
// the enum — instead of recreating tables that already exist in production.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_users_role" ADD VALUE IF NOT EXISTS 'demo';
  `)
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // Postgres cannot drop a single enum value without recreating the type and
  // rewriting every dependent column; not worth it for a rollback of adding
  // one label. No-op.
}
