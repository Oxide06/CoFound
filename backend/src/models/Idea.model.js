const mongoose = require("mongoose");

const IDEA_STAGES = ["Idea", "MVP", "Seed", "Growth"];
const LOOKING_FOR_ROLES = ["Founder", "Developer", "Designer", "Business", "Marketing"];

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    stage: {
      type: String,
      enum: IDEA_STAGES,
      required: [true, "Stage is required"]
    },
    skillsNeeded: {
      type: [String],
      default: []
    },
    lookingFor: {
      type: [String],
      enum: LOOKING_FOR_ROLES,
      default: []
    },
    equityOffered: {
      type: Number,
      min: [0, "Equity cannot be less than 0"],
      max: [100, "Equity cannot be more than 100"],
      default: 0
    },
    coverImage: {
      url: String,
      public_id: String
    },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    interestedCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", ideaSchema);
module.exports.IDEA_STAGES = IDEA_STAGES;
module.exports.LOOKING_FOR_ROLES = LOOKING_FOR_ROLES;
