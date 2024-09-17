// Basic example of using SQLite

const sqlite3 = require("sqlite3").verbose();

// open the database contained in the filename mydatabase.db
// if the file doesn't exist, sqlite3 will create it
const db = new sqlite3.Database("mydatabase.db");

// db.serailize will cause any db commands to run in sequence
db.serialize(function() {

  // if a previously existing table named Stuff exists, drop it
  db.run("DROP TABLE IF EXISTS Stuff");

  // create a table called Stuff with one text field "thing"
  db.run("CREATE TABLE Stuff (thing TEXT)");

  // Prepare the statement with db.prepare
  //
  // Note that ? is a placeholder where we will later provide
  // values when we run the statement.  Using a placeholder like this
  // clearly separates SQL code from values... if we did something like this...
  // "INSERT INTO Stuff VALUES (" + somevar + ")" to build a string by
  // appending in a JavaScript variable, we would need to be very careful.
  // SQL injection can occur if that JS variable contained any SQL code:
  //   https://www.w3schools.com/sql/sql_injection.asp
  const stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

  // insert 10 random values into the table
  var rnd;
  for (var i = 0; i < 10; i++)
  {
    rnd = Math.floor(Math.random() * 1000000);

    // runs the actual statement
    stmt.run("Thing #" + rnd);
  }

  // executed when we are finished with the statement
  stmt.finalize();

  // runs the SQL statement... the callback function is given any
  // error as the first argument (null if no errors), and the results
  // are provided as the second argument (which we just output to the console)
  db.all("SELECT rowid AS id, thing FROM Stuff",
  	     function(err,results) {
           console.log(results);
  	     });

  // db.each is like db.all, but the callback is called for each record
  /*
  db.each("SELECT rowid AS id, thing FROM Stuff",
  	      function(err, row) {
            console.log(row.id + ": " + row.thing);
   	      });
  */

});
