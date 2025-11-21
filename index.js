require('dotenv').config();  // For environment variables if used
var express = require('express');
var app = express();

// Enable CORS (Cross-Origin Resource Sharing) for testing in FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Set 'trust proxy' to handle IP address correctly when behind a proxy (like Heroku)
app.set('trust proxy', true);

// Serve static files from the 'public' directory (if any)
app.use(express.static('public'));

// Root endpoint for testing or static file serving
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Simple hello API endpoint for testing
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Endpoint that returns user's IP address, language, and user-agent (software)
app.get('/api/whoami', function (req, res) {
  // Extract the necessary information from the request headers
  var ipaddress = req.ip;  // Get the IP address (ensure 'trust proxy' is set)
  
  // Extract the preferred language from the 'Accept-Language' header
  var language = req.headers['accept-language'].split(',')[0];  // Get the first language
  
  // Extract the user-agent (software) string from the 'User-Agent' header
  var software = req.headers['user-agent'];  // Get the full user-agent string

  // Send the extracted info as a JSON response
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
