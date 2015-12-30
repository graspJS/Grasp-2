var db = require('./connection.js');
//Checks if lessons table exists on database if it doesn't then creates the table.
db.schema.hasTable('lessons').then(function (exists) {
  if(!exists) {
      return db.schema.createTable('lessons', function (table) {
      table.increments('id').primary();
      table.string('name', 100);
    });
    } else {
        console.log("lessons exist!");
      }
  });
//Checks if users table exists on database if it doesn't then creates the table.
db.schema.hasTable('users').then(function(exists) {
  if(!exists) {
    return db.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 100).unique().notNullable();
      table.string('firstname', 100).notNullable();
      table.string('secondname', 100).notNullable();
      table.string('hashedpw', 100).notNullable();
      table.string('email', 100).unique().notNullable();
      table.date('age');
      table.integer('lessonsCompleted').references('id').inTable('lessons');
      table.integer('lessonsInprogress').references('id').inTable('lessons');
    });
  } else {
    console.log("users exist!");
  }
});
