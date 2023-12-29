// Docker commands.
export default {
  stackLogs: 'docker-compose logs -f',
  nginxReload: 'docker exec dampx-stack-nginx-1 nginx -s reload',
  mysql: 'docker exec dampx-stack-mariadb-1 mysql -u root -pPASSWORDHERE',
  mysqlDump: 'docker exec dampx-stack-mariadb-1 mysqldump -u root -pPASSWORDHERE',
  wp: (wpContainerName, wpContainerPath) => `exec -it ${wpContainerName} wp --path=${wpContainerPath}`,
  composer: (composerContainerName, composerContainerPath) => `exec -it ${composerContainerName} composer --working-dir=${composerContainerPath}`,
};
