(#linkmir)

# ➤ LinkMir

Welcome to LinkMir! 

Linkmir is a new social media platform with one caveat - you can only post http/https links - no comments, no images, just links.

## Table of contents
* [Intro](#linkmir)
* [Tech Stack](#techstack)
* [Development server](#development-server)
* [Setup](#setup)
* [APi](#api)

(#techstack)

## ➤ Tech Stack

The application is a headless API written in JavaScript for use on a Nodejs server. As such, a handful of npm packages where used. Here is the list of the higher level packages:
* Express
* Mongoose

The application connects to a free mongoDB server set up. The password has been inconveniently removed and replaced with `<PASSWORD>` in `server\services\linkmirservice.js`. Password available upon request.

(#development-server)

## ➤ Development server

Install dependencies with `npm install`. To run the local site, use `npm run devStart` which will start listening on port 8080 if it is available. The server will automatically reload if you change any of the source files. If you wish to just run it without devStart, run `node server/app.js` to start the project.

(#api)

## ➤ API Endpoints

**Adding a URL**
----
  This method will attempt to add the URL given in the body to the DB and return to the user the shortened URL by which they can access their saved URL. If the EXACT URL is already in the system then no new entry is created, and the user is returned the existing shortened URL.

* **URL**

  * URL is root

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

* **Data Params**

  The body most contain a resolvable URL using only `http` or `https` 

* **Success Response:**
  
  If successful, the only response a user should get back is the shortened URL.

  * **Code:** 200 <br />
    **Content:** `<Shortened URL>`
 
* **Error Response:**

  Reasons for failure
  * Body parameter is not a URL
  * Body parameter is using a protocol other than `http` and `https`
  * Body parameter contains no protocol
  * Error connecting to DB
  * Error saving to DB

  * **Code:** 400 BAD REQUEST ERROR <br />
    **Content:** `{ error : "Invalid protocol" }`

**Getting an unfurled URL**
----
  This method will attempt to get the unfurled URL based on a given shortened hash. If such a hash exists, then the user will be given the unfurled URL. If it doesn't, then the user will get an error message.

* **URL**

  * `/:hash`

* **Method:**
  
  `Get`
  
*  **URL Params**

   A shortened URL hash

* **Data Params**

  None

* **Success Response:**
  
  If successful, the only response a user should get back is the unfurled URL.

  * **Code:** 200 <br />
    **Content:** `{ domain: <URL> }`
 
* **Error Response:**

  Reasons for failure
  * Hash doesn't exist in DB
  * Error connecting to DB
  * Error saving to DB

  * **Code:** 400 BAD REQUEST ERROR <br />
    **Content:** `{ error : "No hash exists" }`

**Getting an unfurled URL stats**
----
  This method will attempt to get the stats of the unfurled URL based on a given shortened hash. If such a hash exists, then the user will be given the unfurled URL stats. If it doesn't, then the user will get an error message.

* **URL**

  * `/:hash/stats`

* **Method:**
  
  `Get`
  
*  **URL Params**

   A shortened URL hash

* **Data Params**

  None

* **Success Response:**
  
  If successful, the only response a user should get back is the URL object with stats.

  * **Code:** 200 <br />
    **Content:** `{ <Domain object> }`
 
* **Error Response:**

  Reasons for failure
  * Hash doesn't exist in DB
  * Error connecting to DB

  * **Code:** 400 BAD REQUEST ERROR <br />
    **Content:** `{ error : "No hash exists" }`

**Getting Domain and/or Subdomain stats**
----
  This method will attempt to get the stats of any URLs matching the given domain/subdomain parameters. Both parameters are required, but an asterisk can be entered to mean a wildcard. 

  Searching Options (Domain / Subdomain):
  * `domain`/`subdomain` => Matches on both domain and subdomain
  * `*`/`subdomain` => Matches on subdomain
  * `domain`/`*` => Matches on domain
  * `*`/`*` => Full site stats
  
  The stats returned
  * Count found
  * Total Times accessed
  * Total Times created

* **URL**

  * `/:domain/:subdomain/stats`

* **Method:**
  
  `Get`
  
*  **URL Params**

   * Domain in URL
   * Subdomain in URL

* **Data Params**

  None

* **Success Response:**
  
  If successful, the only response a user should get back is the URL object with stats.

  * **Code:** 200 <br />
    **Content:** `{ count: <number>, timesAccessed: <number>, timesCreated: <number> }`
 
* **Error Response:**

  Reasons for failure
  * Error connecting to DB

  * **Code:** 400 BAD REQUEST ERROR <br />
    **Content:** `{ error : "No Results exist" }`
	