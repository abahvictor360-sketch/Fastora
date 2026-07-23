import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds a "background" treatment (default/dark/card) to the Content block so
 * long runs of text sections can be visually broken up, and adds tables for
 * the new "Audience Grid" page block (a pill/tag list, e.g. "Who We Serve").
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_background" AS ENUM('default', 'dark', 'card');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_background" AS ENUM('default', 'dark', 'card');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  ALTER TABLE "pages_blocks_content" ADD COLUMN IF NOT EXISTS "background" "enum_pages_blocks_content_background" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "background" "enum__pages_v_blocks_content_background" DEFAULT 'default';

  CREATE TABLE IF NOT EXISTS "pages_blocks_audience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Who we serve',
  	"heading" varchar DEFAULT 'Who we work with',
  	"description" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_audience_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_audience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Who we serve',
  	"heading" varchar DEFAULT 'Who we work with',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_audience_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );

  ALTER TABLE "pages_blocks_audience_grid_items" ADD CONSTRAINT "pages_blocks_audience_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_grid" ADD CONSTRAINT "pages_blocks_audience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_grid_items" ADD CONSTRAINT "_pages_v_blocks_audience_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_audience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_grid" ADD CONSTRAINT "_pages_v_blocks_audience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX IF NOT EXISTS "pages_blocks_audience_grid_order_idx" ON "pages_blocks_audience_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_audience_grid_parent_id_idx" ON "pages_blocks_audience_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_audience_grid_path_idx" ON "pages_blocks_audience_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_audience_grid_items_order_idx" ON "pages_blocks_audience_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_audience_grid_items_parent_id_idx" ON "pages_blocks_audience_grid_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_audience_grid_order_idx" ON "_pages_v_blocks_audience_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_audience_grid_parent_id_idx" ON "_pages_v_blocks_audience_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_audience_grid_path_idx" ON "_pages_v_blocks_audience_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_audience_grid_items_order_idx" ON "_pages_v_blocks_audience_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_audience_grid_items_parent_id_idx" ON "_pages_v_blocks_audience_grid_items" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "background";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "background";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_content_background";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_content_background";

  DROP TABLE IF EXISTS "pages_blocks_audience_grid_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_audience_grid" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_audience_grid_items" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_audience_grid" CASCADE;
  `)
}
