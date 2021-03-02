const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const domainSchema = new Schema({
	hash: {
		type: String,
		required: true
	},
	fullUrl: {
		type: String,
		required: true
	},
	domain: {
		type: String,
		required: true
	},
	subdomain: {
		type: String
	},
	lastCreated: {
		type: Date,
		required: true,
		default: new Date()
	},
	lastAccessed: {
		type: Date,
		required: true,
		default: new Date()
	},
	timesAccessed: {
		type: Number,
		required: true,
		default: 0
	},
	timesCreated: {
		type: Number,
		required: true,
		default: 1
	}
});

const Domain = mongoose.model("Domain", domainSchema);
module.exports = Domain;