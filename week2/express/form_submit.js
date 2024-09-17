const express = require('express');
const app = express();

// we use the urlencoded middleware to process request bodies containing POST 
// request parameters (e.g. form data sent via POST requests)
app.use(express.urlencoded({extended: false}));

// send back the index.html file in response to a request for the root URL
app.get("/", function(req,res)
{
  res.sendFile(__dirname + "/index.html");
});

// if a post request to /form is received...
app.post("/form", function(req,res) 
{
  // send back a string containing the username and password received in 
  // the post request itself, which the urlencoded middleware makes available 
  // in a JSON object at req.body
  res.send( "Username: " + req.body.username + " <br /> "  +
            "Password: " + req.body.password + " <br /> " );
});

// wildcard case
app.get(/^(.+)$/, function(req,res)
{
  console.log('static file request : ' + req.params);
  res.sendFile( __dirname + req.params[0]);
});

const server = app.listen(3000, function() {
  console.log("Example app listening....");
});