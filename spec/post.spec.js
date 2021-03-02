const request = require("request");
const base_url = "http://127.0.0.1:8080/"

describe("POST / no url in body", function () {
	it("returns status code 200", function (done) {
		request.post({
			headers: { 'content-type': 'text/plain' },
			url: base_url,
			body: ""
		}, function (error, response, body) {
			expect(response.statusCode).toBe(400);
			expect(body).toBe('Invalid URL');
			done();
		});
	});
});

describe("POST / no protocol in url", function () {
	it("returns status code 200", function (done) {
		request.post({
			headers: { 'content-type': 'text/plain' },
			url: base_url,
			body: "www.google.com"
		}, function (error, response, body) {
			expect(response.statusCode).toBe(400);
			expect(body).toBe('Invalid URL');
			done();
		});
	});
});

describe("POST / no protocol in url", function () {
	it("returns status code 200", function (done) {
		request.post({
			headers: { 'content-type': 'text/plain' },
			url: base_url,
			body: "ftp://www.google.com"
		}, function (error, response, body) {
			expect(response.statusCode).toBe(400);
			expect(body).toBe('Invalid protocol');
			done();
		});
	});
});

describe("POST / no protocol in url", function () {
	it("returns status code 200", function (done) {
		request.post({
			headers: { 'content-type': 'text/plain' },
			url: base_url,
			body: "http://www.google.com"
		}, function (error, response, body) {
			expect(response.statusCode).toBe(200);
			expect(body).toBe('http://127.0.0.1:8080/aTG5åNKìîdQNÜÜ2Hrgzi');
			done();
		});
	});
});