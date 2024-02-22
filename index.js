const express = require('express');
const app = express();

// Import the axios library, to make HTTP requests
const axios = require('axios');

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

// Declare the redirect route
app.get('/home', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token;
    console.log(response.data);
    
    // Redirect the user to the home page, along with the access token
    res.redirect(`/home.html?access_token=${accessToken}`);
  }).catch((error) => {
    // Handle errors
    console.error('Error occurred while fetching access token:', error.response.data);
    res.status(error.response.status || 500).send('Error occurred while fetching access token');
  });
});

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(4000, () => {
    console.log("Server listening on port: 4000");
});
