const request = require('request')
const _ = require('lodash')

module.exports = function (url) {
  var pub = {}

  pub.makeRequest = function(data, done) {
    /**
     * handle edge cases before making POST request.
    */
    if(!url) {
      console.log('Slack webhook URL was not set.');
      return "Slack webhook URL was not set.";
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
      if (response.body == undefined) {
          return "Invalid slack webhook URL."
        }
   
      if (response.body == 'ok') {
        console.log("RESPONSE\n\n",  response.body,' f')
        return "Slack notification sent successfully."
      }
      else if (response.body !== 'ok') {
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
    let request = pub.makeRequest(data, done)
    // console.log('the ', request == 'Slack notification sent successfully.')
    
    return request
  }

  pub.extend = function(defaults) {
    return function(options = '', done) {
      if (typeof options == 'string') {
        if(options.length == 0){
          console.log("Provide a descriptive message.")
          return "Provide a descriptive message."
        }
        options = {text: options};
      }
      if(options == undefined) {
        console.log("Provide a descriptive message.")
        return "Provide a descriptive message."
      }
      let payload = pub.send(_.extend(defaults, options), done);
      return payload;
    }
  }

  // operations
  pub.bug = pub.extend({
    channel: "#monitor",
    icon_emoji: ":bomb:",
    username: 'monitor-test'
  })

  pub.log = error => (
    error.stack
  )

  return pub;
}
