//sets up database connection
var pg = require('knex')({
  client: 'pg',
  connection: {
    host     :  'localhost',
    user     : 'postgres',
    password : 'password',
    database : 'graspdb',
    port: 5432
  },
  searchPath: 'knex,public'
});


module.exports = pg;
