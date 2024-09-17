/*

  In this example, we make 3 http requests, and the requests are chained
  together... callback1 makes the 2nd http request, whose callback2
  function makes the third http request.  This would very quickly become
  "callback hell" (if it isn't already!) and so this is why we really want
  to use axios to make our requests!

*/

const http = require('http');

const options =
  {host: 'localhost',
   path: '/api',
   port: '3000',
   method: 'POST',
};

callback1 = function(response)
{
  console.log("callback 1...")
  var str = "";
  response.on('data', function(chunk) { str += chunk; });
  response.on('end', function () {
    console.log(str);

    // make the next request...
    const data2 = {"SomeKey" : "SomeValue2"};
    const req2 = http.request(options,callback2);
    req2.setHeader("Content-Type", "application/json");
    req2.write(JSON.stringify(data2));
    req2.end();

  });
}

const data1 = {"SomeKey" : "SomeValue1"};
const req1 = http.request(options,callback1);
req1.setHeader("Content-Type", "application/json");
req1.write(JSON.stringify(data1));
req1.end();

callback2 = function(response)
{
  console.log("callback 2...")
  var str = "";
  response.on('data', function(chunk) { str += chunk; });
  response.on('end', function () {
    console.log(str);

    // make the next request...
    const data3 = {"SomeKey" : "SomeValue3"};
    const req3 = http.request(options,callback3);
    req3.setHeader("Content-Type", "application/json");
    req3.write(JSON.stringify(data3));
    req3.end();

  });
}

callback3 = function(response)
{
  console.log("callback 3...")
  var str = "";
  response.on('data', function(chunk) { str += chunk; });
  response.on('end', function () {
    console.log(str);

  });
}