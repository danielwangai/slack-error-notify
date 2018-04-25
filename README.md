# error-logs-on-slack

This is an npm package to log errors from your running **js** app to a designated slack channel to help developers solve bugs at a faster rate and also reduce the time taken to **find** bugs on your codebase.

## How it works
1. [install](https://nodejs.org/en/download/) nodejs for your specific environment.

2. Create a slack app on this [link](https://api.slack.com/apps/new) and get your app's webhook url. [Click](https://api.slack.com/incoming-webhooks) for more info on slack webhooks.

3. export the following environment variables on your terminal/command line:-

		-- `$ export SLACK_BUG_WEBHOOK_URL=<YOUR_WEBHOOK_URL>`
		-- `$ export SLACK_BUG_CHANNEL=<NAME-OF-SLACK-CHANNEL>`
		-- `$ export BUG_EMOJI=<EMOJI-OF-CHOICE>`
		-- `$ export BUG_REPORT_USERNAME=<WEBHOOK-USERNAME>` - available on display information section of the webhook account section.
