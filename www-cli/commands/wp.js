import { program } from 'commander';
import chalk from 'chalk';
import { spawn } from 'child_process';
import dockerCommands from '../docker-commands.js';
import dotenv from 'dotenv';

dotenv.config();

/*
 * Run WP-CLI.
 * @since 1.0.0
 */
program.command('wp')
  .description('Run WP-CLI commands')
  .arguments('[args...]')
  .action((str, options) => {
    const pwd = process.env.PWD;
    console.log(chalk.green(`Running WP-CLI inside ${pwd}`));

    const wpContainerName = process.env.WP_CONTAINER_NAME;
    const wpContainerPath = process.env.WP_CONTAINER_PATH;

    if (!wpContainerName || !wpContainerPath) {
      console.log(chalk.red('WP_CONTAINER_NAME and WP_CONTAINER_PATH are required in .env file'));
      return;
    }

    const wp = dockerCommands.wp(wpContainerName, wpContainerPath);
    spawn('docker', [...wp.split(' '), ...str], {shell: true, stdio: 'inherit'});
  }).allowUnknownOption();
