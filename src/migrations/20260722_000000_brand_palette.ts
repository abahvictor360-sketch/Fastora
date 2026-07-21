import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the backend-editable color palette columns to `site_settings`.
 * `accent_color` and `primary_color` already exist from the initial migration,
 * so only the new palette fields are added here. Statements are idempotent
 * (IF NOT EXISTS) so this is safe to re-run.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "background_color" varchar DEFAULT '#08080A';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "text_color" varchar DEFAULT '#ECEAE4';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "surface_color" varchar DEFAULT '#121216';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "border_color" varchar DEFAULT '#26262C';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "muted_text_color" varchar DEFAULT '#9D9A92';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "dark_panel_text_color" varchar DEFAULT '#F4F2EC';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "background_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "text_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "surface_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "border_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "muted_text_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "dark_panel_text_color";
  `)
}
