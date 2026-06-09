const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const User = require("../models/User.model");

const buildUploadedImage = (file) => {
  if (!file) return undefined;
  return {
    url: file.path,
    public_id: file.filename
  };
};

const register = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    avatar: buildUploadedImage(req.file)
  });

  const token = generateToken(user._id);
  const response = new ApiResponse(201, { user, token }, "Registered successfully");

  res.status(201).json(response);
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");

  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id);
  const response = new ApiResponse(200, { user, token }, "Logged in successfully");

  res.status(200).json(response);
});

module.exports = { register, login };
