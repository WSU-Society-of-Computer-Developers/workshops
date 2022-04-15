const router = require("express").Router();
const message = require("./message")

router.use("/message", message)

module.exports = router