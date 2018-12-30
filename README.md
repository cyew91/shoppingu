To setup the project in local environment:
  1. Download/Clone the project.
  2. Install Nodejs. => https://nodejs.org/en/
  3. Install Grunt => npm install -g grunt-cli
  4. Install Bower => npm install -g bower
  5. Install Git(If prompt error: No Git binary found in $PATH) => https://gitforwindows.org/
  6. Install Mysql Workbench
  7. After install Mysql -> Create schema name 'shoppingu' -> Run the dbTableSetup.sql under shoppingu/config/database/
  8. Create development.json5 under shoppingu/config/env/
  
To commit(Push) to master: 
  1. git pull
  2. git add .
  3. git commit -m "*COMMIT MESSAGE*"
  4. git push -u origin master

DB Setup:
  1. After the database is ready and finish setup the <env>.json file, run below query in the database:
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your_password>'
