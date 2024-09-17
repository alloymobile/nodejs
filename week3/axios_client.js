/*
  A demo of axios, a package that makes sending http requests much 
  easier.  It includes support for promises/async/await which allows 
  us to structure our code in a nicely readable way too!

  Check out the documentation here:
    https://www.npmjs.com/package/axios  
*/
const axios = require('axios');

// We'll need to use axios inside an async function if we want to use await
async function test()
{
  // we can use try-catch to handle any errors
  try {
	  
    // make a request to our server, send JSON data in the request
    const response1 = await axios.post('http://localhost:3000/api',
	                                      {"mykey1":"myvalue1"});

	  // response object will include more than just the response body
    console.log(response1);
	
    // response body is JSON object .data
	  console.log(response1.data);

    // send another request
    const response2 = await axios.post('http://localhost:3000/api',
	                                     {"mykey2":"myvalue2"});
	  console.log(response2.data);
 
    // and one more request
    const response3 = await axios.post('http://localhost:3000/api',
	                                     {"mykey3":"myvalue3"});
	  console.log(response3.data.mykey3);
	  
    // using await like this to manage a series of requests is MUCH easier 
    // than something like callback-chaining!
	
  } catch (error) {
    console.error(error);
  }	
}

// call our test function
test();
