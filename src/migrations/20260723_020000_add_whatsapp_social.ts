import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/** Adds 'whatsapp' to the Site Settings social platform enum. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_site_settings_social_links_platform" ADD VALUE IF NOT EXISTS 'whatsapp';
  `)
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // Postgres doesn't support removing enum values directly; left as a no-op.
}
