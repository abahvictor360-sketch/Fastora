import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the pageHeaderEyebrow/pageHeaderHeading/pageHeaderDescription fields
 * to Pages, used by utility pages (Services, Work, Contact) that render
 * their own listing/form below a simple header instead of the block-based
 * layout. (Originally modeled as a nested `pageHeader` group — Payload's
 * admin panel silently failed to render ANY group field nested directly
 * inside a tab, including the pre-existing `hero` group, so these were
 * flattened to plain top-level fields instead. Column names are unchanged:
 * Payload's snake_case naming for a flat `pageHeaderEyebrow` field and a
 * grouped `pageHeader.eyebrow` field both resolve to `page_header_eyebrow`.)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_header_eyebrow" varchar;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_header_heading" varchar;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_header_description" varchar;

    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_header_eyebrow" varchar;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_header_heading" varchar;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_header_description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_header_eyebrow";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_header_heading";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_header_description";

    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_header_eyebrow";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_header_heading";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_header_description";
  `)
}
