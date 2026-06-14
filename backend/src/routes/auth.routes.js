const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword
} = require("../controllers/auth.controller");
const { uploadAvatar } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const { USER_ROLES } = require("../models/User.model");

const router = express.Router();

router.post(
  "/register",
  uploadAvatar,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(USER_ROLES).withMessage("Valid role is required")
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required")
  ],
  validate,
  login
);

router.post(
  "/verify-email",
  [
    body("token").notEmpty().withMessage("Token is required")
  ],
  validate,
  verifyEmail
);

router.post(
  "/resend-verification",
  [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail()
  ],
  validate,
  resendVerification
);

router.post(
  "/forgot-password",
  [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail()
  ],
  validate,
  forgotPassword
);

router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Token is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  validate,
  resetPassword
);

module.exports = router;
