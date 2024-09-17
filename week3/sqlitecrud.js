// SQLite "CRUD functions" example demonstrating creating, updating, reading
// and destroying data...

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employee.db");

db.serialize(function() {

  // create employees table
  db.run("DROP TABLE IF EXISTS Employees");
  db.run("CREATE TABLE Employees (firstname TEXT, lastname TEXT, salary REAL)");

  // insert records into the employee table
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Kevin','Browne','50000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Mary','Yendt','65000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Michael','Jordan','60000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Sharon','Fuller','85000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Wayne','Gretzky','70000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Ajit','Singh','43000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Tiger','Woods','90000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Happy','Gilmour','32000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Jane','Doe','65000']);
  db.run("INSERT INTO Employees VALUES (?,?,?)", ['Bob','Mills','93000']);

  // select all employees to see the table before the changes
  db.all("SELECT rowid AS id, * FROM Employees",
  	     function(err,results) { console.log(results); });

  // delete an employee based on the id
  db.run("DELETE FROM Employees WHERE rowid=?",[10],
         function(err) {console.log(err) });

  // delete an employee based on the id
  db.run("DELETE FROM Employees WHERE firstname=?",["Kevin"],
         function(err) {console.log(err) });

  // delete an employee based on the id
  db.run("UPDATE Employees SET firstname=?,lastname=?,salary=? WHERE rowid=?",
         ["Larissa","Black","75000",2],
         function(err) {console.log(err) });

  // select all employees again to see results after changes
  db.all("SELECT rowid AS id, * FROM Employees",
         function(err,results) { console.log(results); });

});
