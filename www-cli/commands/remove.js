import { program } from 'commander';
import chalk from 'chalk';
import { exec } from 'child_process';
import dockerCommands from '../docker-commands.js';
import { wwwDir, virtualHostsDir } from '../paths.js';

/*
 * Run remove project.
 * @since 1.0.0
 */
program.command('remove')
  .description('Delete project directory, nginx configuration files, and database')
  .argument('<string>', 'Project name')
  .action((str, options) => {
    console.log(chalk.red('Deleting project...'))

    // Paths.
    const project = options.project+options.tld;
    const projectDir = wwwDir+project;
    const virtualHostFile = virtualHostsDir+project+'.conf';

    exec(`rm -rvf ${projectDir}`)
    console.log(chalk.grey(`- ${projectDir} directory deleted`))

    unlinkSync(virtualHostFile)
    console.log(chalk.grey(`- Nginx config deleted ${virtualHostFile}`))

    exec(dockerCommands.nginxReload)
    console.log(chalk.grey('- Nginx reloaded'))

    exec(dockerCommands.mysql+` -e "DROP DATABASE \\\`${project}\\\`"`)
    console.log(chalk.grey('- Database dropped'))
  });
