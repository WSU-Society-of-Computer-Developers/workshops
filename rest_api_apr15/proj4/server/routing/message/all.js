const db = require("../../db")
module.exports = (req, res) => {
    res.status(200).json(db.getData("/messages"))
}