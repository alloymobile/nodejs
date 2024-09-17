// Example of defining and using our own middleware function

const express = require("express");
const app = express();

// we can define our own middleware functions...
var myLogger = function(req,res,next) {
  console.log("LOGGED");
  next();
}

// the middleware function myLogger will apply to *all* routes defined here 
// onward in the file
app.use(myLogger);

// whether route1 or route2 is requested, the myLogger middleware will run!
app.get("/route1", function(req,res) {
  res.send("route1!");
});
app.get("/route2", function(req,res) {
  res.send("route2!");
});

app.listen(3000);