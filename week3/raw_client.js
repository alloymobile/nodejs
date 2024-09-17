// Example of making an http request using the "raw" http package.
// This is a very cumbersome approach that is to be avoided - use axios!
const http = require('http');

// setup the options of the request
const options =
  {host: 'localhost',
   path: '/api',
   port: '3000',
   method: 'POST',
};

// callback function that will be called to handle the response to the request
callback = function(response)
{
  console.log("callback...")
  var str = "";

  // the data event will occur when a chunk of data has been received, we'll
  // append it to the str to build the response body string
  response.on('data', function(chunk) { str += chunk; });

  // the end event will occur when all of the response has been received, we'll
  // output the response body string
  response.on('end', function () { console.log(str); });
}

// make a request with some data in the body of the request, the request uses
// the above options to make the request and the callback function to handle
// the response
const data = {"SomeKey" : "SomeValue"};
const req = http.request(options,callback);
req.setHeader("Content-Type", "application/json");
req.write(JSON.stringify(data));
req.end();
