const crypto = require("crypto");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const User = require("../models/User.model");
const sendEmail = require("../utils/sendEmail");

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

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    avatar: buildUploadedImage(req.file),
    isVerified: false,
    verificationToken,
    verificationTokenExpires
  });

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const verificationLink = `${clientUrl}/verify-email?token=${verificationToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Verify your CoFound Account",
      text: `Hello ${user.name},\n\nPlease verify your account by clicking this link: ${verificationLink}\n\nThis link will expire in 24 hours.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #6C47FF;">Welcome to CoFound!</h2>
          <p>Hello ${user.name},</p>
          <p>Thank you for registering on CoFound. Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #6C47FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
          </div>
          <p style="color: #7b7a8e; font-size: 12px;">This link will expire in 24 hours. If you did not request this registration, please ignore this email.</p>
        </div>
      `
    });
  } catch (emailError) {
    await User.findByIdAndDelete(user._id);
    throw new ApiError(502, "Account could not be created because the verification email failed to send.");
  }

  const response = new ApiResponse(201, { email: user.email }, "Verification email sent. Please check your inbox.");
  res.status(201).json(response);
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");

  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email address to log in.");
  }

  const token = generateToken(user._id);
  const response = new ApiResponse(200, { user, token }, "Logged in successfully");

  res.status(200).json(response);
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, "Token is required");
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification token.");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  const response = new ApiResponse(200, {}, "Email verified successfully. You can now log in.");
  res.status(200).json(response);
});

const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "Email is already verified");
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  user.verificationToken = verificationToken;
  user.verificationTokenExpires = verificationTokenExpires;
  await user.save();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const verificationLink = `${clientUrl}/verify-email?token=${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your CoFound Account",
    text: `Hello ${user.name},\n\nPlease verify your account by clicking this link: ${verificationLink}\n\nThis link will expire in 24 hours.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #6C47FF;">Welcome to CoFound!</h2>
        <p>Hello ${user.name},</p>
        <p>You requested a new verification link. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #6C47FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        <p style="color: #7b7a8e; font-size: 12px;">This link will expire in 24 hours.</p>
      </div>
    `
  });

  const response = new ApiResponse(200, {}, "New verification email sent. Please check your inbox.");
  res.status(200).json(response);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    // To prevent user enumeration, return successful response even if user not found,
    // but log locally so developer knows what happened.
    const response = new ApiResponse(200, {}, "If that email is registered, a password reset link has been sent.");
    return res.status(200).json(response);
  }

  const resetPasswordToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetLink = `${clientUrl}/reset-password?token=${resetPasswordToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your CoFound Password",
    text: `Hello ${user.name},\n\nYou requested a password reset. Please click this link to reset your password: ${resetLink}\n\nThis link will expire in 1 hour.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #6C47FF;">Reset Password Request</h2>
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your password. Please click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #6C47FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #7b7a8e; font-size: 12px;">This link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
      </div>
    `
  });

  const response = new ApiResponse(200, {}, "If that email is registered, a password reset link has been sent.");
  res.status(200).json(response);
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    throw new ApiError(400, "Token and password are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token.");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const response = new ApiResponse(200, {}, "Password has been reset successfully. You can now log in.");
  res.status(200).json(response);
});

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword
};
