const express = require("express");

const router= express.Router();

const {getRegister, getLogin, registerUser, loginUsers} = require("../controllers/authController")

router.get("/register", getRegister);
router.get("/login", getLogin);
router.post("/register", registerUser);
router.post("/login", loginUsers);

module.exports = router;