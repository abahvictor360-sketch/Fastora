import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds:
 *  - `posts_tags` array table (Posts → free-form tags)
 *  - `users.role` enum column (role-based access; extensible via new enum values)
 *
 * Mirrors Payload's postgres naming conventions so the ORM's queries resolve.
 * All statements are idempotent so this is safe to re-run.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Posts tags (array field) --------------------------------------------
    CREATE TABLE IF NOT EXISTS "posts_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "posts_tags"
        ADD CONSTRAINT "posts_tags_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");

    -- Users role (single-value select) ------------------------------------
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "enum_users_role" DEFAULT 'admin';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "posts_tags" CASCADE;
    ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
    DROP TYPE IF EXISTS "public"."enum_users_role";
  `)
}
