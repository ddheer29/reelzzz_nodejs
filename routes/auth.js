const express = require("express");
const router = express.Router();
const {
  signInWithOauth,
  refreshToken,
  checkUsernameAvailability,
  signUpWithOauth,
  signUpWithEmail,
  loginWithEmail
} = require("../controllers/auth/auth");

router.post("/check-username", checkUsernameAvailability);
router.post("/login", signInWithOauth);
router.post("/register", signUpWithOauth);
router.post("/refresh-token", refreshToken);
router.post("/register-email", signUpWithEmail );
router.post("/login-email", loginWithEmail );

module.exports = router;
