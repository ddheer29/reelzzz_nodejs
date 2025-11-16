const express = require("express");
const router = express.Router();
const {
  signUpWithOauth,
  signInWithOauth,
  refreshToken,
  checkUsernameAvailability,
  sendOtp,
  verifyOtp,
} = require("../controllers/auth/auth");

router.post("/signup-oauth", signUpWithOauth);
router.post("/signin-oauth", signInWithOauth);
router.post("/refresh", refreshToken);
router.post("/check-username", checkUsernameAvailability);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
