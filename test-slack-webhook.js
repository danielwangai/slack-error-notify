var MY_SLACK_WEBHOOK_URL = process.env.SLACK_BUG_WEBHOOK_URL
const slack = require('./slack-webhook')(MY_SLACK_WEBHOOK_URL);

function getRectArea(width, height) {
	if (isNaN(width) || isNaN(height)) {
		throw "Parameter is not a number!";
	}
}

try {
	getRectArea(3, 'A');
}
catch (e) {
	console.log(e)
	slack.bug(e)
	// console.log(typeof slack.request(e))
	// expected output: "Parameter is not a number!"
}
