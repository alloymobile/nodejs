// Example of using sqlite package with sqlite3 to use async and await!

const sqlite3 = require('sqlite3').verbose();
const sqlite = require("sqlite");

async function test()
{
  // the sqlite package offers "promisified" functions, functions which 
  // return promises, which means we can use await to wait for their 
  // completion inside an asynchronous function
  //
  // here we open a connection to the database...
  //
	const db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
  });
  
  // we can then run commands in sequece one after the other using await 
  await db.exec('CREATE TABLE tbl (col TEXT)')
  await db.exec('INSERT INTO tbl VALUES ("test")')
  const result = await db.get('SELECT col FROM tbl WHERE col = ?', 'test')
  console.log(result);
}

test();