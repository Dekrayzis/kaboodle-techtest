const path = require('path');

module.exports = {
  reactStrictMode: true,env: {
    GOOGLEMAPS_KEY: 'my_google_apiKey',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "_variables.scss";`
  }
}