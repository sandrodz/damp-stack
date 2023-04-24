import { program } from 'commander';

/*
 * Run stack server.
 * @since 1.0.0
 */
program.command('server')
  .description('Start/Stop/Reload server')
  .action((str, options) => {});
