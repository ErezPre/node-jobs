const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
// console.log(register);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
