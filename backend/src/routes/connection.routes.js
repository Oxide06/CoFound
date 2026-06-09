const express = require("express");
const { body } = require("express-validator");
const {
  sendRequest,
  getMyConnections,
  updateConnectionStatus
} = require("../controllers/connection.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

router.post(
  "/",
  protect,
  [body("receiverId").isMongoId().withMessage("Valid receiverId is required")],
  validate,
  sendRequest
);

router.get("/", protect, getMyConnections);

router.patch(
  "/:id",
  protect,
  [body("status").isIn(["accepted", "rejected"]).withMessage("Status must be accepted or rejected")],
  validate,
  updateConnectionStatus
);

module.exports = router;
