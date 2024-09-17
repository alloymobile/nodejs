// Try testing this server with the postman app that will allow you to send
// POST requests with JSON data in the body:
//   https://www.postman.com/
//

const express = require('express');
const app = express();

// manual processing of a request body of JSON data is cumbersome!
app.post("/api1", function(req,res)
{
  // manually obtain and parse the request body of JSON data
  var str = "";
  req.on("data", function(chunk) { str += chunk;});
  req.on("end", function() {

    // create the JSON object from the data in the request
    var reqObj = JSON.parse(str);

    console.log(reqObj);

	// send back the JSON object;
	res.json(reqObj);
  });

});

// Make the app use the express middleware... this will apply to any routes
// defined after this statement.  If the body contains JSON data, then a JSON
// object of that data will be available in req.body.
app.use(express.json());

app.post("/api2", function(req,res)
{
  // req.body will now contain a JSON object if a POST request to /api2
  // contains JSON data
  console.log(req.body);

  // send back the JSON object
  res.json(req.body);

});

var server = app.listen(3000, function(){
  console.log("RESTful API listening on port 3000!")
});
