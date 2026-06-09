const express = require("express");
const { body, query } = require("express-validator");
const {
  createIdea,
  getAllIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea
} = require("../controllers/idea.controller");
const { protect } = require("../middleware/auth.middleware");
const { uploadIdeaCover } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const { IDEA_STAGES } = require("../models/Idea.model");

const router = express.Router();

const ideaValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("stage").isIn(IDEA_STAGES).withMessage("Valid stage is required"),
  body("equityOffered")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 })
    .withMessage("Equity offered must be between 0 and 100")
];

const updateIdeaValidators = [
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("description").optional().trim().notEmpty().withMessage("Description cannot be empty"),
  body("stage").optional().isIn(IDEA_STAGES).withMessage("Invalid stage"),
  body("equityOffered")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 })
    .withMessage("Equity offered must be between 0 and 100")
];

router.get(
  "/",
  [
    query("stage").optional().isIn(IDEA_STAGES).withMessage("Invalid stage"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be a positive integer")
  ],
  validate,
  getAllIdeas
);

router.post("/", protect, uploadIdeaCover, ideaValidators, validate, createIdea);
router.get("/:id", getIdeaById);
router.patch("/:id", protect, uploadIdeaCover, updateIdeaValidators, validate, updateIdea);
router.delete("/:id", protect, deleteIdea);

module.exports = router;
