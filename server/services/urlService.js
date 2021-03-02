const URL = require('url').URL;

const protocols = require('../constants/protocols');

const tryParseUrl = (urlString) => {
	let url, errorString;

	try {
		url = new URL(urlString);

		errorString = url.protocol
			? protocols.Accepted
				.map(x => `${x.toLowerCase()}:`)
				.includes(url.protocol)
				? ""
				: "Invalid protocol"
			: "No protocol given";
	} catch (err) {
		errorString = "Invalid URL";
	} finally {
		return { url: url, error: errorString };
	}
};

module.exports = {
	"tryParseUrl": tryParseUrl
};
