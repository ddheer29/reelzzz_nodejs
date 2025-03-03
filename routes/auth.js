const express = require("express");
const router = express.Router();
const { signUpWithEmail, loginWithEmail } = require("../controllers/auth/auth");

router.post("/register", signUpWithEmail );
router.post("/login", loginWithEmail );

module.exports = router;