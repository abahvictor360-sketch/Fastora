import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/** Adds tables for the new "Our Process" page block (steps repeater). */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "pages_blocks_our_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our process',
  	"heading" varchar DEFAULT 'How we work with you',
  	"description" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_our_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_our_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our process',
  	"heading" varchar DEFAULT 'How we work with you',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_our_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );

  ALTER TABLE "pages_blocks_our_process_steps" ADD CONSTRAINT "pages_blocks_our_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_process" ADD CONSTRAINT "pages_blocks_our_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_process_steps" ADD CONSTRAINT "_pages_v_blocks_our_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_process" ADD CONSTRAINT "_pages_v_blocks_our_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX IF NOT EXISTS "pages_blocks_our_process_order_idx" ON "pages_blocks_our_process" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_our_process_parent_id_idx" ON "pages_blocks_our_process" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_our_process_path_idx" ON "pages_blocks_our_process" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_our_process_steps_order_idx" ON "pages_blocks_our_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_our_process_steps_parent_id_idx" ON "pages_blocks_our_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_process_order_idx" ON "_pages_v_blocks_our_process" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_process_parent_id_idx" ON "_pages_v_blocks_our_process" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_process_path_idx" ON "_pages_v_blocks_our_process" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_process_steps_order_idx" ON "_pages_v_blocks_our_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_process_steps_parent_id_idx" ON "_pages_v_blocks_our_process_steps" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "pages_blocks_our_process_steps" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_our_process" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_our_process_steps" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_our_process" CASCADE;
  `)
}
