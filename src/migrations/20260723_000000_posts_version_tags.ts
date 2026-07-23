import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * The 20260722_010000_tags_and_roles migration created `posts_tags` (the
 * published-row table for Posts' `tags` array field) but missed its
 * versions-table counterpart, `_posts_v_version_tags` — Posts has drafts
 * enabled, so every read of the Posts list/edit views joins against that
 * table too. Its absence was silently breaking the whole Insights admin
 * view (Payload's version-aware queries always join to it, even when a
 * post has never been drafted). Mirrors the shape of the sibling
 * `_posts_v_version_populated_authors` table (serial id + `_uuid` to
 * preserve the original row's varchar id across versions).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_posts_v_version_tags" (
      "id" serial PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_uuid" varchar,
      "tag" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "_posts_v_version_tags"
        ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_posts_v_version_tags" CASCADE;
  `)
}
