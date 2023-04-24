import { program } from 'commander';
import chalk from 'chalk';
import { exec } from 'child_process';
import dockerCommands from '../docker-commands.js';
import { dbDir } from '../paths.js';

/*
 * Run db export.
 * @since 1.0.0
 */
export const dbExport = program.command('db-export')
  .description('Export database')
  .argument('<string>', 'Project name')
  .option('--tld <string>', 'Top level domain', '.test')
  .action((name, options) => {
    const project = name+options.tld;
    console.log(chalk.green('Exporting database... '+project));
    exec(dockerCommands.mysqlDump+` ${project} > ${dbDir}${project}.sql`)
  });

/*
 * Run db import.
 * @since 1.0.0
 */
export const dbImport = program.command('db-import')
  .description('Import database')
  .argument('<string>', 'Project name')
  .option('--tld <string>', 'Top level domain', '.test')
  .action((name, options) => {
    const project = name+options.tld;
    console.log(chalk.green('Importing database... '+project));
    exec(dockerCommands.mysql+` ${project} < ${dbDir}${project}.sql`)
  });
