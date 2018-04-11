const chai = require('chai');
const assert = chai.assert;

var slack_notify = require('../slack-webhook.js')
const TEST_WEBHOOK_URL = process.env.SLACK_TEST_WEBHOOK_URL

describe('Slack webhook notifier', function () {
    it('should fail if slack webhook URL is not specified', function () {
        assert.equal(slack_notify().bug('bug'), 'Slack webhook URL was not set.')
    })

    it('should fail if no message is provided', function () {
        assert.equal(slack_notify(TEST_WEBHOOK_URL).bug(), 'Provide a descriptive message.')
    })

    // it('invalid url', function () {
    //     console.log(slack_notify("432423423").request("message"))
    //     // assert.equal(slack_notify("432423423").bug(), 'Provide a descriptive message.')
    // })
})
