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

  pub.send = function (options, done) {
    if(typeof options == 'string') {
      options = { text: options }
    }

    // add options to defaults
    var defaults = {
      username: 'Error',
      text: '',
      icon_emoji: ':bell:'
    };

    var data = Object.assign(defaults, options);

    // Move the fields into attachments
    if (options.fields) {
      if (!data.attachments) {
        data.attachments = [];
      }

      data.attachments.push({
        fallback: 'Alert details',
        fields: _.map(options.fields, function (value, title) {
          return {
            title: title,
            value: value,
            short: (value + '').length < 25
          };
        })
      });

      delete(data.fields);
    }

    if(options.icon_url && !options.icon_emoji) {
      delete(data.icon_emoji);
    }
    pub.request(data, done)
  }

  pub.extend = function(defaults) {
    return function(options, done) {
      if (typeof options == 'string') {
        options = {text: options};
      }

      pub.send(_.extend(defaults, options), done);
    }
  }

  // operations
  pub.bug = pub.extend({
    channel: "#monitor",
    icon_emoji: ":bomb:",
    username: 'monitor-test'
  })

  return pub;
}
