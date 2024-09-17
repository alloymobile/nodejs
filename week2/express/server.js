// Examples of route handling with Express

const express = require('express');
const app = express();

// we can create a route like this, the route would be accessible at...
//   http://localhost:3000/myroute
app.get("/myroute", function(req,res) {
  res.send("You are visiting my route!");
});

// we can include route parameters with :name
//   e.g. http://localhost:3000/myroute/4
app.get("/myroute/:id", function(req,res) {
  console.log("get request with parameter");
  res.send("ID: " + req.params.id);
});

// we can make routes for post requests
app.post("/myroute", function(req,res) {
  console.log("post request");
  res.send("post request");
});

// we can make routes for put requests
app.put("/myroute", function(req,res) {
  console.log("put request");
  res.send("put request");
});

// we can make routes for delete requests
app.delete("/myroute", function(req,res) {
  console.log("delete request");
  res.send("delete request");
});

// We can access URL parameters with req.query.keyname, for example
// try sending a request to: 
//    http://localhost:3000/submit?key1=test123
app.get("/submit", function(req,res) {
  console.log("key 1: " + req.query.key1);
  res.send("key 1: " + req.query.key1);
});

// we can send back JSON data in a response (will be important for REST 
// APIs)
app.get("/json", function(req,res) {
  console.log("Send back JSON data...");
  var some_data = 
    {"some_key" : "some_value",
     "some_other_key" : 42};
  res.json(some_data);
});

// the next() function will pass execution on to the next handler function...
var cb0 = function(req,res,next) {
  console.log("CB0");
  next();
};

// we can define multiple functions to handle a request...
var cb1 = function(req,res,next) {
  console.log("CB1");
  next();
};

// the last function sends back the actual response...
var cb2 = function(req,res) {
  res.send("Hello from C!");
};

// we can chain functions together... allowing us to define behaviours and 
// create custom chains of behaviours for different routes
app.get("/example/c", [cb0,cb1,cb2]);

// another syntax for chaining route handler functions...
app.get("/example/d", [cb0,cb1], 
  function(req,res,next) {
    console.log("the response will be sent by the next function!");
    next();
  },
  
  function(req,res)
  {
    res.send("Hello from D!");
  }
);

// Here pattern matching is used to match *anything* and return the file/folder 
// specified by the route, essentially allowing Express to behave a bit like 
// an Apache server (sending back whatever files are requested relative to 
// a certain folder, typically public_html).  Because Express will run the 
// handler function(s) for the first matching route only, we need to put this 
// route at the bottom of the file, because it will match *anything* including 
// the above routes.  The "first match" is done according to the order routes 
// are defined using app.get(), etc.
app.get(/^(.+)$/, function(req,res)
{
  console.log('static file request : ' + req.params);
  res.sendFile( __dirname + req.params[0]);
});

const server = app.listen(3000, function() {
  console.log("Example app listening....");
});