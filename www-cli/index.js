#!/usr/bin/env node

import { program } from 'commander';

/*
 * Commands.
 */
program
  .version('1.0.0', '-v, --version');

await import('./commands/server.js');
await import('./commands/logs.js');
await import('./commands/db.js');
await import('./commands/create.js');
await import('./commands/remove.js');
await import('./commands/wp.js');
await import('./commands/composer.js');

program.parse();

// End.
