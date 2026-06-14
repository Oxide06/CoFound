const express = require("express");
const { body, query } = require("express-validator");
const {
  getAllUsers,
  getMe,
  updateMe,
  getUserByUsername
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const { uploadAvatar } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const { USER_ROLES } = require("../models/User.model");

const router = express.Router();

router.get(
  "/",
  [
    query("role").optional().isIn(USER_ROLES).withMessage("Invalid role"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be a positive integer")
  ],
  validate,
  getAllUsers
);

router.get("/me", protect, getMe);

router.patch(
  "/me",
  protect,
  uploadAvatar,
  [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("bio").optional().isLength({ max: 500 }).withMessage("Bio cannot exceed 500 characters"),
    body("role").optional().isIn(USER_ROLES).withMessage("Invalid role"),
    body("linkedinUrl").optional({ checkFalsy: true }).isURL().withMessage("Invalid LinkedIn URL"),
    body("githubUrl").optional({ checkFalsy: true }).isURL().withMessage("Invalid GitHub URL"),
    body("portfolioUrl").optional({ checkFalsy: true }).isURL().withMessage("Invalid Portfolio URL"),
    body("headline").optional().trim(),
    body("experienceLevel").optional().isIn(["Junior", "Mid", "Senior", "Lead"]).withMessage("Invalid experience level"),
    body("availability").optional().isIn(["Full-time", "Part-time", "Contract", "Not Available"]).withMessage("Invalid availability status")
  ],
  validate,
  updateMe
);

router.get("/:id", getUserByUsername);

module.exports = router;
