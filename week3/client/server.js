
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const app = express();

// use JSON middleware to parse request bodies and put result into req.body
app.use(express.json());

// creates the database and table of data to be managed, then starts the server
async function startup()
{
  // create the database connection
  db = await sqlite.open({
    filename: 'client.db',
    driver: sqlite3.Database
  });
  
  // create 
  await db.run("DROP TABLE IF EXISTS Client");
  await db.run("CREATE TABLE Client (fname TEXT, lname TEXT, email TEXT, password TEXT)");
 
  // insert initial records into the table... the REST api you create for 
  // the assignment should NOT do this, it should start off with no data in 
  // it... we do it in this starter code for debugging purposes
  var stmt = await db.prepare("INSERT INTO Client VALUES (?,?,?,?)");
  await stmt.run("Robert", "Samson", "robert@gmail.com", "abcd1234");
  await stmt.run("Devid", "John", "david@gmail.com", "1234");
  stmt.finalize();

  // start the server
  const server = app.listen(3000, function(){
    console.log("RESTful API listening on port 3000!")
  });
}

startup();

// RESTful API
app.get('/client', async (req, res) => {
  const rows = await db.all("SELECT * FROM Client");
  res.json(rows);
});

app.post('/client', async (req, res) => {
  const {fname, lname, email, password} = req.body;
  await db.run("INSERT INTO Client VALUES (?,?,?,?)", fname, lname, email, password);
  res.send("Record added to database");
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const rows = await db.all("SELECT * FROM Client WHERE email = ? AND password = ?", email, password);
    if(rows.length > 0)
      res.send("Login successful");
    else
      res.send("Login failed");
});

app.put('/reset', async (req, res) => {
  const {email, password} = req.body;
  await db.run("UPDATE Client SET password = ? WHERE email = ?",password, email);
  res.send("Record updated in database");
});