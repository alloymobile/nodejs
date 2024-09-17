/*

  A simple server that takes post requests, receives and parses the
  request body, console logs the key received, and then sends back
  what was received in a response.

*/
const express = require('express');
const app = express();

/*

   Use the express JSON middleware to pre-process the body of the request.
   Any requests with the http header Content-type set to json/application
   with JSON data in the body of the request will be pre-processed, and a
   JSON object will be replaced into req.body.

   Middleware documentation: http://expressjs.com/en/api.html#express.json

*/
app.use(express.json());

app.post('/api', function(req, res)
{
  console.log("request...");

  // req.body just contains the JSON data!
  console.log(req.body);

  res.send(JSON.stringify(req.body));

});

var server = app.listen(3000, function()
{
  console.log("Server listening...");
});
