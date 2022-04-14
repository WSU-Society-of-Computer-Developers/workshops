
# Introduction

1. What is a REST API?

* [Quick Introduction Video](https://play.vidyard.com/Le2QkL3lixu3GmssEXYyLg.html)
* To simplify: a REST API is an API that links services together through the web (usually through HTTP)
* Terminology:
  * Representational State Transfer (REST) 
    * An architectural style for designing the linkage between frontend and backend **web** applications.
  * Application Programming Interface (API)
    * An API is a software medium that allows two different applications to talk to each other. 
* [how many people in space](https://www.howmanypeopleareinspacerightnow.com/)
  * GET request for data `/peopleinspace.json`
  * API Request itself
* [wanye canvas endpoints](https://canvas.wayne.edu)
  * Routes: `/courses.json`, `/api/v1/conversations/unread_count`, `https://canvas.wayne.edu/api/v1/dashboard/dashboard_cards`
  * Further documentation for [Canvas API](https://canvas.instructure.com/doc/api)
  * Show sample API `./pre/main.pptx`
  * Show static API: [university list](https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json)
    * [More public APIs](https://github.com/public-apis/public-apis)

# Setup

1. Install [Nodejs](https://nodejs.org)
2. Install [Postman](https://www.postman.com/downloads/)

# Development

3. Create a working directory, and in that directory, do:
* ```sh
npm init
```
4. Then, do:
* ```sh
npm install express
```

