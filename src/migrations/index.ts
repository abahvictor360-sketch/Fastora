import * as migration_20260721_155424_initial from './20260721_155424_initial';

export const migrations = [
  {
    up: migration_20260721_155424_initial.up,
    down: migration_20260721_155424_initial.down,
    name: '20260721_155424_initial'
  },
];
