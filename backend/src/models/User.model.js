const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const USER_ROLES = ["Founder", "Developer", "Designer", "Business", "Marketing"];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: [true, "Role is required"]
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: ""
    },
    skills: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      default: ""
    },
    avatar: {
      url: String,
      public_id: String
    },
    linkedinUrl: {
      type: String,
      default: ""
    },
    githubUrl: {
      type: String,
      default: ""
    },
    portfolioUrl: {
      type: String,
      default: ""
    },
    headline: {
      type: String,
      default: ""
    },
    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior", "Lead"],
      default: "Mid"
    },
    availability: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Not Available"],
      default: "Full-time"
    },
    profileViews: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
module.exports.USER_ROLES = USER_ROLES;
