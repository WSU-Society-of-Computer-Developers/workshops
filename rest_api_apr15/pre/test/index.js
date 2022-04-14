const express = require('express')
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors()) // allow cross-origin request

app.get('/', (req, res) => {
    res.send('Data from backend')
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})