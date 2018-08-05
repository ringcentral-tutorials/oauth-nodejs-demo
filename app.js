if (process.env.ENV_PATH) {
  require('dotenv').config({path: process.env.ENV_PATH});
} else {
  require('dotenv').config();
}

var app = require('express')();
var ringcentral = require('ringcentral');

// Configure Mustache
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Start HTTP server
var server = null;
var port = process.env.PORT;
var useTls = process.env.TLS_ENABLED > 0 ? true : false;

if (useTls) {
  var fs = require('fs');
  server = require('https')
    .createServer({
      key: fs.readFileSync(process.env.TLS_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.TLS_PUBLIC_CERT)
    }, app)
    .listen(port, function () {
      console.log('LISTEN_HTTPS ' + port);
    });
} else {
  server = require('http')
    .Server(app)
    .listen(port, function () {
      console.log('LISTEN_HTTP ' + port);
    });
}

// Start RingCentral SDK
var rcsdk = new ringcentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
});

app.get('/', function (req, res) {
  // Get token for display after OAuth
  var token = rcsdk.platform().auth().data();
  token_json = token['access_token'] ? JSON.stringify(token, null, ' ') : '';

  // Render home page with params
  res.render('index', {
    authorize_uri: rcsdk.platform().authUrl({
      brandId: process.env.RINGCENTRAL_BRAND_ID,        // optional
      redirectUri: process.env.RINGCENTRAL_REDIRECT_URL // optional if 1 configured
    }),
    redirect_uri: process.env.RINGCENTRAL_REDIRECT_URL,
    token_json: token_json
  });
});

app.get('/oauth2callback', function(req, res) {
  if (req.query.code) {
    rcsdk.platform()
      .login({
        code: req.query.code,
        redirectUri: process.env.RINGCENTRAL_REDIRECT_URL
      })
      .then(function (token) {
        // You should store your token in the session here
        console.log('logged_in');
        res.send('login success');
      })
      .catch(function (e) {
        console.log('ERR ' + e.message || 'Server cannot authorize user');
        res.send('Login error ' + e);
      });
  } else {
    res.send('No Auth code');
  }
});
