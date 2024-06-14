const express = require("express");
const router = express.Router();
const apiController = require("../controllers");

router.get("/", apiController.getAPI);

module.exports = router;
