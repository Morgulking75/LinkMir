const request = require("request");
const base_url = "http://127.0.0.1:8080/"

describe("GET /:hash", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + 'næm7âïyS3ôj5mPKâo7ô8', function (error, response, body) {
			expect(response.statusCode).toBe(200);

			let parsedBody = JSON.parse(body);

			expect(parsedBody.hasOwnProperty('domain')).toBe(true);
			expect(parsedBody.domain).toBe('https://asdf.vwadasdfdsas.com/?2435=adfdsadf&exit=fals');
			done();
		});
	});
});

describe("GET /:hash not exists", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + 'asdf', function (error, response, body) {
			expect(response.statusCode).toBe(400);
			expect(body).toBe('No hash exists');
			done();
		});
	});
});

describe("GET /:hash/stats", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + 'næm7âïyS3ôj5mPKâo7ô8/stats', function (error, response, body) {
			expect(response.statusCode).toBe(200);

			let parsedBody = JSON.parse(body);

			expect(parsedBody.hasOwnProperty('fullUrl')).toBe(true);
			expect(parsedBody.hasOwnProperty('hash')).toBe(true);
			expect(parsedBody.hasOwnProperty('domain')).toBe(true);
			expect(parsedBody.hasOwnProperty('subdomain')).toBe(true);
			expect(parsedBody.hasOwnProperty('lastCreated')).toBe(true);
			expect(parsedBody.hasOwnProperty('lastAccessed')).toBe(true);
			expect(parsedBody.hasOwnProperty('timesAccessed')).toBe(true);
			expect(parsedBody.hasOwnProperty('timesCreated')).toBe(true);
			expect(parsedBody.fullUrl).toBe('https://asdf.vwadasdfdsas.com/?2435=adfdsadf&exit=fals');

			done();
		});
	});
});

describe("GET /:hash/stats not exists", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + 'asdf/stats', function (error, response, body) {
			expect(response.statusCode).toBe(400);
			expect(body).toBe('No hash exists');
			done();
		});
	});
});

describe("GET /:domain/:subdomain/stats none exist", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + 'a/a/stats', function (error, response, body) {
			expect(response.statusCode).toBe(200);

			let parsedBody = JSON.parse(body);

			expect(parsedBody.hasOwnProperty('count')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesAccessed')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesCreated')).toBe(true);
			expect(parsedBody.count).toBe(0);
			expect(parsedBody.totalTimesAccessed).toBe(0);
			expect(parsedBody.totalTimesCreated).toBe(0);

			done();
		});
	});
});

describe("GET /:domain/:subdomain/stats get all works", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + '*/*/stats', function (error, response, body) {
			expect(response.statusCode).toBe(200);

			let parsedBody = JSON.parse(body);

			expect(parsedBody.hasOwnProperty('count')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesAccessed')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesCreated')).toBe(true);
			expect(parsedBody.count).toBeGreaterThan(0);
			expect(parsedBody.totalTimesAccessed).toBeGreaterThan(0);
			expect(parsedBody.totalTimesCreated).toBeGreaterThan(0);

			done();
		});
	});
});

describe("GET /:domain/:subdomain/stats get only domain works", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + 'adfdsa.com/*/stats', function (error, response, body) {
			expect(response.statusCode).toBe(200);

			let parsedBody = JSON.parse(body);

			expect(parsedBody.hasOwnProperty('count')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesAccessed')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesCreated')).toBe(true);
			expect(parsedBody.count).toBe(2);
			expect(parsedBody.totalTimesAccessed).toBe(0);
			expect(parsedBody.totalTimesCreated).toBe(2);

			done();
		});
	});
});

describe("GET /:domain/:subdomain/stats get only domain works", function () {
	it("returns status code 200", function (done) {
		request.get(base_url + '*/fdas/stats', function (error, response, body) {
			expect(response.statusCode).toBe(200);

			let parsedBody = JSON.parse(body);

			expect(parsedBody.hasOwnProperty('count')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesAccessed')).toBe(true);
			expect(parsedBody.hasOwnProperty('totalTimesCreated')).toBe(true);
			expect(parsedBody.count).toBe(1);
			expect(parsedBody.totalTimesAccessed).toBe(0);
			expect(parsedBody.totalTimesCreated).toBe(2);

			done();
		});
	});
});
