const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const parseList = require("../utils/parseList");
const User = require("../models/User.model");
const { cloudinary } = require("../config/cloudinary");

const ALLOWED_UPDATE_FIELDS = [
  "name",
  "bio",
  "role",
  "skills",
  "location",
  "linkedinUrl",
  "githubUrl"
];

const buildAvatar = (file) => ({
  url: file.path,
  public_id: file.filename
});

const getMe = asyncHandler(async (req, res) => {
  const response = new ApiResponse(200, { user: req.user }, "Profile fetched");
  res.status(200).json(response);
});

const updateMe = asyncHandler(async (req, res) => {
  const updates = {};

  ALLOWED_UPDATE_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = field === "skills" ? parseList(req.body[field]) : req.body[field];
    }
  });

  if (req.file) {
    if (req.user.avatar && req.user.avatar.public_id) {
      await cloudinary.uploader.destroy(req.user.avatar.public_id);
    }

    updates.avatar = buildAvatar(req.file);
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  const response = new ApiResponse(200, { user }, "Profile updated");
  res.status(200).json(response);
});

const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $inc: { profileViews: 1 } },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const response = new ApiResponse(200, { user }, "User found");
  res.status(200).json(response);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.role) filter.role = req.query.role;
  if (req.query.location) filter.location = new RegExp(req.query.location, "i");
  if (req.query.skills) filter.skills = { $in: parseList(req.query.skills) };
  if (req.query.search) filter.name = new RegExp(req.query.search, "i");

  const [users, total] = await Promise.all([
    User.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter)
  ]);

  const response = new ApiResponse(
    200,
    {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    },
    "Users fetched"
  );

  res.status(200).json(response);
});

module.exports = {
  getMe,
  updateMe,
  getUserByUsername,
  getAllUsers
};
