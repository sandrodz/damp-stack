import { program } from 'commander';
import chalk from 'chalk';
import { spawn } from 'child_process';
import dockerCommands from '../docker-commands.js';
import dotenv from 'dotenv';

dotenv.config();

/*
 * Run Composer.
 * @since 1.0.0
 */
program.command('composer')
  .description('Run Composer commands')
  .arguments('[args...]')
  .action((str, options) => {
    const pwd = process.env.PWD;
    console.log(chalk.green(`Running Composer inside ${pwd}`));

    const composerContainerName = process.env.COMPOSER_CONTAINER_NAME;
    const composerContainerPath = process.env.COMPOSER_CONTAINER_PATH;

    if (!composerContainerName || !composerContainerPath) {
      console.log(chalk.red('COMPOSER_CONTAINER_NAME and COMPOSER_CONTAINER_PATH are required in .env file'));
      return;
    }

    const composer = dockerCommands.composer(composerContainerName, composerContainerPath);
    spawn('docker', [...composer.split(' '), ...str], {shell: true, stdio: 'inherit'});
  }).allowUnknownOption();
