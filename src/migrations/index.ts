import * as migration_20260721_155424_initial from './20260721_155424_initial';
import * as migration_20260722_000000_brand_palette from './20260722_000000_brand_palette';
import * as migration_20260722_010000_tags_and_roles from './20260722_010000_tags_and_roles';
import * as migration_20260722_140000_add_demo_role from './20260722_140000_add_demo_role';
import * as migration_20260723_000000_posts_version_tags from './20260723_000000_posts_version_tags';
import * as migration_20260723_010000_pages_page_header from './20260723_010000_pages_page_header';
import * as migration_20260723_020000_add_whatsapp_social from './20260723_020000_add_whatsapp_social';
import * as migration_20260723_030000_our_process_block from './20260723_030000_our_process_block';

export const migrations = [
  {
    up: migration_20260721_155424_initial.up,
    down: migration_20260721_155424_initial.down,
    name: '20260721_155424_initial',
  },
  {
    up: migration_20260722_000000_brand_palette.up,
    down: migration_20260722_000000_brand_palette.down,
    name: '20260722_000000_brand_palette',
  },
  {
    up: migration_20260722_010000_tags_and_roles.up,
    down: migration_20260722_010000_tags_and_roles.down,
    name: '20260722_010000_tags_and_roles',
  },
  {
    up: migration_20260722_140000_add_demo_role.up,
    down: migration_20260722_140000_add_demo_role.down,
    name: '20260722_140000_add_demo_role',
  },
  {
    up: migration_20260723_000000_posts_version_tags.up,
    down: migration_20260723_000000_posts_version_tags.down,
    name: '20260723_000000_posts_version_tags',
  },
  {
    up: migration_20260723_010000_pages_page_header.up,
    down: migration_20260723_010000_pages_page_header.down,
    name: '20260723_010000_pages_page_header',
  },
  {
    up: migration_20260723_020000_add_whatsapp_social.up,
    down: migration_20260723_020000_add_whatsapp_social.down,
    name: '20260723_020000_add_whatsapp_social',
  },
  {
    up: migration_20260723_030000_our_process_block.up,
    down: migration_20260723_030000_our_process_block.down,
    name: '20260723_030000_our_process_block',
  },
];
