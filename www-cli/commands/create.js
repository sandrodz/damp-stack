import { program } from 'commander';
import chalk from 'chalk';
import { exec } from 'child_process';
import dockerCommands from '../docker-commands.js';
import { wwwDir, virtualHostsDir } from '../paths.js';

/*
 * Run create project.
 * @since 1.0.0
 */
program.command('create')
  .description('Create project directory, nginx configuration files, and database')
  .argument('<string>', 'Project name')
  .option('--tld <string>', 'Top level domain', '.test')
  .option('--php <version>', 'PHP version', /^(7.0|7.2|7.4|7.4-xdebug|8.1-xdebug)$/i, '8.1-xdebug')
  .option('--config <type>', 'Nginx config', /^(php|wp)$/i, 'wp')
  .option('--root <dir>', 'Project root', '/public')
  .action((str, options) => {
    console.log(chalk.green('Creating project...'))

    // Paths.
    const project = options.project+options.tld;
    const projectDir = wwwDir+project;
    const virtualHostFile = virtualHostsDir+project+'.conf';

    // Config template.
    const virtualHostTemplate = `server {
        listen       80;
        server_name  ${project};
        root         /www/$host${options.root};

        set $upstream php${options.php};
        include /etc/nginx/nginx-${options.config}-common.conf;
    }
    `

    if (!existsSync(projectDir)) {
      mkdirSync(projectDir, '0755')
      console.log(chalk.grey(`- ${projectDir} directory created`))
    }

    writeFileSync(virtualHostFile, virtualHostTemplate)
    console.log(chalk.grey(`- Nginx config created \n ${virtualHostTemplate}`))

    exec(dockerCommands.nginxReload)
    console.log(chalk.grey('- Nginx reloaded'))

    exec(dockerCommands.mysql+` -e "CREATE DATABASE \\\`${project}\\\`"`)
    console.log(chalk.grey('- Database created'))
  });
