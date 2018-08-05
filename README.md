# RingCentral 3-Legged OAuth Demo in Node.js with Express

[![Community][community-img]][community-url]
[![Twitter][twitter-img]][twitter-url]

 [community-img]: https://img.shields.io/badge/dynamic/json.svg?label=community&colorB=&suffix=%20users&query=$.approximate_people_count&uri=http%3A%2F%2Fapi.getsatisfaction.com%2Fcompanies%2F102909.json
 [community-url]: https://devcommunity.ringcentral.com/ringcentraldev
 [twitter-img]: https://img.shields.io/twitter/follow/ringcentraldevs.svg?style=social&label=follow
 [twitter-url]: https://twitter.com/RingCentralDevs

## Overview

This is a quick 3-legged OAuth demo that runs using JavaScript, Node.js and Express with the [RingCentral JavaScript SDK](https://github.com/ringcentral/ringcentral-js) v2.x

## Installation

### Via NPM

```
$ git clone https://github.com/ringcentral-tutorials/authorization-flow-nodejs-express-demo
$ cd authorization-flow-nodejs-express-demo 
$ npm install
```

### Configuration

Edit the `.env` file and add your RingCentral API Keys (application key and application secret).

```
$ cd authorization-flow-nodejs-express-demo
$ mv config-sample.env .env
$ vi .env
```

In the [Developer Portal](http://developer.ringcentral.com/), ensure the redirect URI in your config file has been entered in your app configuration. By default, the URL is set to the following for this demo:

```
http://localhost:8080/oauth2callback
```

#### Using TLS

If you set the following parameters, you can start this demo using TLS. Be sure you are using HTTPS for your redirect URI.

| Property | Information |
|----------|-------------|
| `TLS_ENABLED` | Set to `1` for HTTPS and `0` for HTTP |
| `TLS_PRIVATE_KEY` | Set to path to PEM file for private key |
| `TLS_CERTIFICATE` | Set to path to PEM file for certificate |

## Usage

Start the application using the [NPM](https://www.npmjs.com/) command:

```
$ npm start
```

Open your browser and go to the Demo App URL:

```
http://localhost:8080
````

Then click the <input type="button" value="Login with RingCentral"> button to authorize the demo app and view the access token.

## Screenshots

The following are example screenshots of the authentication and authorization pages shown.

### Authentication

![](docs/images/ringcentral_oauth_authentication.png)

### Authorization

![](docs/images/ringcentral_oauth_authorization.png)

## Links

* Documentation
  * [RingCentral Developer Guide](https://developer.ringcentral.com/api-docs/latest/index.html#!#AuthorizationCodeFlow)
  * [IETF OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749) [Authorization Code flow](https://tools.ietf.org/html/rfc6749#section-1.3.1)
* SDKs with built-in Authorization Code helpers (others, like Python can still be used)
  * [ringcentral-js](https://github.com/ringcentral/ringcentral-js)

## Contributing

1. Fork it (http://github.com/ringcentral-tutorials/ringcentral-demos-oauth/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
