const express = require("express");
const router = express.Router();

const protectRoute = require("../middleware/protectRoute");
const { getUsers } = require("../controller/users");

router.post('/' , protectRoute , getUsers)

module.exports = router;