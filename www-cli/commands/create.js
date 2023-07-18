import { program } from 'commander';
import chalk from 'chalk';
import { exec } from 'child_process';
import dockerCommands from '../docker-commands.js';
import { wwwDir, virtualHostsDir } from '../paths.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

/*
 * Run create project.
 * @since 1.0.0
 */
program.command('create')
  .description('Create project directory, nginx configuration files, and database')
  .argument('<string>', 'Project name')
  .option('--tld <string>', 'Top level domain', '.test')
  .option('--php <version>', 'PHP version', /^(7.0-fpm|7.2-fpm|7.4-fpm|7.4-fpm-xdebug|8.1-fpm|8.1-fpm-xdebug)$/i, '8.1-fpm-xdebug')
  .option('--config <type>', 'Nginx config', /^(php|wp)$/i, 'wp')
  .option('--root <dir>', 'Project root', '/public')
  .action((name, options) => {
    console.log(chalk.green('Creating project...'))

    // Paths.
    const project = name+options.tld;
    const projectDir = wwwDir+project;
    const virtualHostFile = virtualHostsDir+project+'.conf';

    const isXdebug = options.php.includes('xdebug');

    // Config template.
    const virtualHostTemplate = `server {
    listen       80;
    server_name  ${project};
    root         /www/$host${options.root};

${isXdebug ? '    fastcgi_read_timeout 1000;' : ''}

    resolver 127.0.0.11;
    set $upstream php${options.php}:9000;
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
