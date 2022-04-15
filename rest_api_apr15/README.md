# REST API Workshop by [Zavaar Shah](https://github.com/thatziv)

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

## Project 1 - Fun Fact API

* Objectives: 
  - Learn how to parse JSON data from  API data.
  - Learn GET Request fundamentals with `axios`

1. First, initialize a node project in an empty folder:
```sh
npm init -y
```

2. Then, do:
```sh
npm install axios
```

3. Create an `index.js` file with the following contents:
```js
const axios = require("axios")
const URL = "https://asli-fun-fact-api.herokuapp.com/"
function main() {
    axios.get(URL).then(response => {
        /* 
        // SAMPLE DATA:
        {
            status: true,
            data: {
                id: '85',
                fact: 'We spend around 10 years watching TV',
                cat: 'tech',
                hits: '1113'
            }
        }
        */
        const { data: { data } } = response
        /* 
            data = {
                id: '85',
                fact: 'We spend around 10 years watching TV',
                cat: 'tech',
                hits: '1113'
            }
        */
        /* const responseData = response.data
        const factObj = responseData.data */
        console.log(`Fun Fact: ${data.fact}\nCategory: ${data.cat}\nThis fact has ${data.hits} hits!`)
    })
}

main()
```


## Project 2 - Parse University List API

* Objectives: 
  - Learn how to parse JSON data from static API data.
  - Use frontend and backend REST practices

1. Create a working directory, and create `index.html` file with the contents:
```html
<html>
<head>
    <title>Universities across the world</title>
</head>
<div id="container">
    Loading Data...
</div>
<script>
    (async () => {
        const targetUrl = "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json"
        try {
            const response = await fetch(targetUrl, { method: "GET" })
            const jsonData = await response.json() // this data will be an array of objects
            var final = "" // what will be displayed to the container
            for (let i = 0; i < jsonData.length; i++) {
                let thisSchool = jsonData[i]
                const row = `
                <img width="40" height="22" src="https://www.geonames.org/flags/x/${thisSchool.alpha_two_code.toLowerCase()}.gif"/>
                <a href="${thisSchool.web_pages[0]}">
                    ${thisSchool.name}
                </a>
                </br>**`**
                final += row
            }
            setContent(final)
        } catch (err) {
            setContent(err.toString())
        }
    })()
    function setContent(txt) {
        document.querySelector("#container").innerHTML = txt
    }
</script>
</html>
```


## Project 3 - Joke API

This project aims to demonstrate how a REST API functions as a standalone backend webserver

* Requirements
  1. nodejs
  2. node package manager (NPM)
    - express

1. First, initialize a node project in an empty folder:
```sh
npm init -y
```

2. Then, do:
```sh
npm install express
```

3. Create an `index.js` file with the following contents:
```js
const express = require("express")
const app = express()
const port = 5000
var jokes = [
    "What did the fish say when he swam into a wall? Dam.",
    "What do you call a fish with no eyes? A fsh.",
    "What do you call a can opener that doesn't work? A can't opener!",
]

app.get("/", (request, response) => {
    response.json({ status: true })
})

// READ - 'R' in CRUD
app.get("/getJoke", (request, response) => {
    const { query } = request
    //console.log(query)
    if (query.num) {
        try {
            response.json({ joke: jokes[query.num] || "joke not found" }) // res.json is something like res.setHeaders(json...).send({...})
        } catch (err) {
            response.json({ error: "invalid joke number" })
        }
    } else {
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
        response.json({ joke: randomJoke })
    }
})

// READ - 'R' in CRUD
app.get("/getAllJokes", (request, response) => {
    response.json(jokes)
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})

```

4. PART 2 (introduction to other CRUD routes):
```diff
const express = require("express")
const app = express()
const port = 5000
var jokes = [
    "What did the fish say when he swam into a wall? Dam.",
    "What do you call a fish with no eyes? A fsh.",
    "What do you call a can opener that doesn't work? A can't opener!",
]

app.get("/", (request, response) => {
    response.json({ status: true })
})

// READ - 'R' in CRUD
app.get("/getJoke", (request, response) => {
    const { query } = request
    //console.log(query)
    if (query.num) {
        try {
            response.json({ joke: jokes[query.num] || "joke not found" }) // res.json is something like res.setHeaders(json...).send({...})
        } catch (err) {
            response.json({ error: "invalid joke number" })
        }
    } else {
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
        response.json({ joke: randomJoke })
    }
})

// READ - 'R' in CRUD
app.get("/getAllJokes", (request, response) => {
    response.json(jokes)
})

+  // PART 2: //
+  // DELETE - 'D' in CRUD
+  app.post("/clearJokes", (request, response) => { 
+      response.json({ status: `clearing ${jokes.length} joke(s)` })
+      jokes = [] // reset jokes array
+  })
+
+  // CREATE - 'C' in CRUD, or UPDATE - 'U' in CRUD
+  app.put("/addJoke", (request, response) => {
+      const userJoke = request.query.joke
+      if (userJoke) {
+          jokes.push(userJoke)
+          response.json({ status: `added joke: ${userJoke}`, jokes })
+      } else {
+          response.json({error: "please provide a joke"})
+      }
+  })
+  // END PART 2 //

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})

```

## Project 4 - Full-stack Messaging Project

This project aims to demonstrate how a REST API is intertwined with the frontend.

* Requirements
  1. nodejs
  2. node package manager (NPM)
    - express
    - body-parser

1. First, initialize a node project in an empty folder:
```sh
npm init -y
```

2. Then, do:
```sh
npm install express body-parser
```

3. Refer to `./proj4` for source code
4. make sure `database.json` starts off with:
```json
{"messages": []}
```