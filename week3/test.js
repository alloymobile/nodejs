// Example of testing the REST API in server.js using axios

const axios = require('axios');

// We'll need to use axios inside an async function if we want to use await
async function test()
{
  // we can use try-catch to handle any errors
  try {
	  
    // make a request to our server, send JSON data in the request
    const response1 = await axios.get('http://localhost:3000/api');

	  // response object will include more than just the response body
    console.log(response1.data);
    
    // To *really* make sure the data we got back is what is expected, we need 
    // to do comparisons of the actual data against the expected data and report
    // any unexpected values (these would be failed test cases).
    if (response1.data[0].item != "Dog") 
      console.log("FAILED TEST #1: Dog not found as 1st item!");
    
    // Perhaps we expected "Cat" as the 2nd item...
    if (response1.data[1].item != "Cat") 
      console.log("FAILED TEST #1: Cat not found as 2nd item!");
	
  } catch (error) {
    console.error(error);
  }	
}

// call our test function
test();
