const mongoose = require("mongoose");
const hashSvc = require('./hashService');
const Domain = require("../models/Domain");

const uri = "mongodb+srv://linkmirSvc:<PASSWORD>@cluster0.i07mx.mongodb.net/links?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const addUrl = async (url) => {
	let hash = hashSvc.getHash(url.href);
	let domain = await Domain.findOne({ 'hash': hash });
	let hostSplit = [...url.host.split('.').reverse(), ""];

	if (domain === null) {
		domain = new Domain({
			hash: hash,
			fullUrl: url.href,
			domain: hostSplit[1] + '.' + hostSplit[0],
			subdomain: hostSplit[2],
			lastCreated: new Date(),
			lastAccessed: new Date(),
			timesAccessed: 0,
			timesCreated: 1
		});
	}
	else {
		domain.lastCreated = new Date();
		domain.timesCreated++;
	}

	try {
		const newUser = await domain.save();
	} catch (err) {
		console.log(err);

		return { error: "Error saving the domain" };
	}

	return { hash: hash };
};

const getUrl = async (hash) => {
	let domain = await Domain.findOne({ 'hash': hash });

	if (domain) {
		domain.lastAccessed = new Date();
		domain.timesAccessed++;

		await domain.save();
	}

	return domain;
};

const getUrls = async (domain, subdomain) => {
	let search = {};

	if (domain !== '*') {
		search.domain = domain;
	}

	if (subdomain !== '*') {
		search.subdomain = subdomain;
	}

	let domains = await Domain.find(search);

	return domains;
};

module.exports = {
	"addUrl": addUrl,
	"getUrl": getUrl,
	"getUrls": getUrls
};
