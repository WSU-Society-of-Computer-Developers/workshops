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

// PART 2: //
// DELETE - 'D' in CRUD
app.post("/clearJokes", (request, response) => {
    response.json({ status: `clearing ${jokes.length} joke(s)` })
    jokes = [] // reset jokes array
})

// CREATE - 'C' in CRUD, or UPDATE - 'U' in CRUD
app.put("/addJoke", (request, response) => {
    const userJoke = request.query.joke
    if (userJoke) {
        jokes.push(userJoke)
        response.json({ status: `added joke: ${userJoke}`, jokes })
    } else {
        response.json({ error: "please provide a joke" })
    }
})
// END PART 2 //

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})
