const express = require("express");
const router = express.Router();

const {
  createSeoulInitCityAPI,
} = require("../controllers/cities");

router.route("/create").get(createSeoulInitCityAPI);

module.exports = router;
