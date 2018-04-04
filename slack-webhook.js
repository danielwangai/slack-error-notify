const request = require('request')
const _ = require('lodash')

module.exports = function (url) {
  var pub = {}

  pub.request = function(data, done) {
    /**
     * handle edge cases before making POST request.
    */
    if(!url) {
      console.log('Slack webhook URL was not set.');
      return false;
    }
    if(typeof done != 'function') {
      done = function() {};
    }
    if(typeof pub.onError != 'function') {
      pub.onError = function() {};
    }
    // make POST request
    request.post(url, {
      form: {
        payload: JSON.stringify(data)
      }
    }, function(err, response) {
      if (err) {
        pub.onError(err);
        return done(err);
      }
      if (response.body !== 'ok') {
        /**
         * something went wrong.
         * response ok - means successful request.
        */
        pub.onError(new Error(response.body));
        return done(new Error(response.body));
      }
      done();
    });
  };

  return pub;
}
