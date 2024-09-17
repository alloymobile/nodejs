// Starter code for a REST API, feel free to use this to help with Assignment #1

const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const app = express();

// use JSON middleware to parse request bodies and put result into req.body
app.use(express.json());

// GET the entire collection, send it back as JSON data
app.get("/api", async function(req,res)
{
  // acknowledge request received on the console for debugging
  console.log("GET COLLECTION REQUEST RECEIVED");
  
  // get the data to be sent back 
  const data = 
    await db.all("SELECT rowid as id, item, description FROM Collection");
  
  // output data to console for debugging
  console.log(JSON.stringify(data));

  // send back table data as JSON data
  res.json(data);
});

// creates the database and table of data to be managed, then starts the server
async function startup()
{
  // create the database connection
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
  
  // create 
  await db.run("DROP TABLE IF EXISTS Collection");
  await db.run("CREATE TABLE Collection (item TEXT, description TEXT)");
 
  // insert initial records into the table... the REST api you create for 
  // the assignment should NOT do this, it should start off with no data in 
  // it... we do it in this starter code for debugging purposes
  var stmt = await db.prepare("INSERT INTO Collection VALUES (?,?)");
  await stmt.run("Dog", "Barks when happy");
  await stmt.run("Rabbit", "Enjoys eating carrots");
  stmt.finalize();

  // start the server
  const server = app.listen(3000, function(){
    console.log("RESTful API listening on port 3000!")
  });
}

startup();
