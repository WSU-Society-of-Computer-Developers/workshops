const db = require("../../db")

module.exports = (req, res) => {
    const message = db.getData("/messages").find(c => c.id == req.params.id)
    if (!message) res.status(404).json({ error: "message was not found" })
    res.status(200).json(message)
}