import * as migration_20260721_155424_initial from './20260721_155424_initial';
import * as migration_20260722_000000_brand_palette from './20260722_000000_brand_palette';
import * as migration_20260722_010000_tags_and_roles from './20260722_010000_tags_and_roles';

export const migrations = [
  {
    up: migration_20260721_155424_initial.up,
    down: migration_20260721_155424_initial.down,
    name: '20260721_155424_initial'
  },
  {
    up: migration_20260722_000000_brand_palette.up,
    down: migration_20260722_000000_brand_palette.down,
    name: '20260722_000000_brand_palette'
  },
  {
    up: migration_20260722_010000_tags_and_roles.up,
    down: migration_20260722_010000_tags_and_roles.down,
    name: '20260722_010000_tags_and_roles'
  },
];
