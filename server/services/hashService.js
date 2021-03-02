const crypto = require('crypto');

const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ";
const base = characters.length;

function getHash(theString) {
	let hash = "";

	let hashStr = crypto.createHash('md5').update(theString).digest("hex");

	let leftHalf = parseInt(hashStr.substring(0, (hashStr.length / 2)), 16);
	let rightHalf = parseInt(hashStr.substring((hashStr.length / 2)), 16);

	while (leftHalf > 0) {
		hash = characters[parseInt(leftHalf % base)] + hash;
		leftHalf = Math.floor(leftHalf / base);
	}

	while (rightHalf > 0) {
		hash = characters[parseInt(rightHalf % base)] + hash;
		rightHalf = Math.floor(rightHalf / base);
	}

	return hash;
}

module.exports = {
	"getHash": getHash
};
