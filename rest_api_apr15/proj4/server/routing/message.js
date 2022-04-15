const all = require("./message/all");
const create = require("./message/create");
const view = require("./message/view");
const router = require("express").Router();

router.get("/all", all) // /message/all
router.post("/create", create) // /message/create
router.get("/:id", view) // /message/:id


module.exports = router