const express = require('express');
const urlService = require('./services/urlService');
const linkmirSvc = require('./services/linkmirservice');

const app = express();

app.use(express.text());

app.post('/', async (req, res) => {
	let parsedUrl = urlService.tryParseUrl(req.body);

	if (parsedUrl.error !== "") {
		res.status(400).send(parsedUrl.error);

		return;
	}

	let result = await linkmirSvc.addUrl(parsedUrl.url);

	if (result.error !== undefined) {
		res.status(400).send(result.error);

		return;
	}

	let fullUrl = req.protocol + '://' + req.get('host') + '/' + result.hash;

	res.status(200).send(fullUrl);
});

app.get('/:domain/:subdomain/stats', async (req, res) => {
	let result = await linkmirSvc.getUrls(req.params.domain, req.params.subdomain);

	if (!result) {
		res.status(400).send('No results exist');

		return;
	}

	res.status(200).send({
		count: result.length,
		totalTimesAccessed: result.reduce((a, b) => a + (b['timesAccessed'] || 0), 0),
		totalTimesCreated: result.reduce((a, b) => a + (b['timesCreated'] || 0), 0)
	});
})

app.get('/:hash/stats', async (req, res) => {
	let result = await linkmirSvc.getUrl(req.params.hash);

	if (!result) {
		res.status(400).send('No hash exists');

		return;
	}

	res.status(200).send(result);
})

app.get('/:hash', async (req, res) => {
	let result = await linkmirSvc.getUrl(req.params.hash);

	if (!result) {
		res.status(400).send('No hash exists');

		return;
	}

	res.status(200).send({ domain: result.fullUrl });
})

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}..`));
