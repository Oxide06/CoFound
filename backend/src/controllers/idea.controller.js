const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const parseList = require("../utils/parseList");
const Idea = require("../models/Idea.model");
const { cloudinary } = require("../config/cloudinary");

const buildCoverImage = (file) => ({
  url: file.path,
  public_id: file.filename
});

const buildIdeaPayload = (body) => {
  const payload = {};
  const scalarFields = ["title", "description", "stage", "equityOffered"];

  scalarFields.forEach((field) => {
    if (body[field] !== undefined) payload[field] = body[field];
  });

  if (body.skillsNeeded !== undefined) payload.skillsNeeded = parseList(body.skillsNeeded);
  if (body.lookingFor !== undefined) payload.lookingFor = parseList(body.lookingFor);

  return payload;
};

const ensureFounder = (idea, userId) => {
  if (idea.founder.toString() !== userId.toString()) {
    throw new ApiError(403, "Only the founder can perform this action");
  }
};

const createIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.create({
    ...buildIdeaPayload(req.body),
    coverImage: req.file ? buildCoverImage(req.file) : undefined,
    founder: req.user._id
  });

  const response = new ApiResponse(201, { idea }, "Idea created");
  res.status(201).json(response);
});

const getAllIdeas = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.stage) filter.stage = req.query.stage;
  if (req.query.founder) filter.founder = req.query.founder;
  if (req.query.skillsNeeded) filter.skillsNeeded = { $in: parseList(req.query.skillsNeeded) };
  if (req.query.search) {
    filter.$or = [
      { title: new RegExp(req.query.search, "i") },
      { description: new RegExp(req.query.search, "i") }
    ];
  }

  const [ideas, total] = await Promise.all([
    Idea.find(filter)
      .populate("founder", "name avatar role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Idea.countDocuments(filter)
  ]);

  const response = new ApiResponse(
    200,
    {
      ideas,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    },
    "Ideas fetched"
  );

  res.status(200).json(response);
});

const getIdeaById = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id).populate("founder", "name avatar role bio");

  if (!idea) {
    throw new ApiError(404, "Idea not found");
  }

  const response = new ApiResponse(200, { idea }, "Idea fetched");
  res.status(200).json(response);
});

const updateIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    throw new ApiError(404, "Idea not found");
  }

  ensureFounder(idea, req.user._id);

  Object.assign(idea, buildIdeaPayload(req.body));

  if (req.file) {
    if (idea.coverImage && idea.coverImage.public_id) {
      await cloudinary.uploader.destroy(idea.coverImage.public_id);
    }

    idea.coverImage = buildCoverImage(req.file);
  }

  await idea.save();

  const response = new ApiResponse(200, { idea }, "Idea updated");
  res.status(200).json(response);
});

const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    throw new ApiError(404, "Idea not found");
  }

  ensureFounder(idea, req.user._id);

  if (idea.coverImage && idea.coverImage.public_id) {
    await cloudinary.uploader.destroy(idea.coverImage.public_id);
  }

  await idea.deleteOne();

  const response = new ApiResponse(200, {}, "Idea deleted");
  res.status(200).json(response);
});

module.exports = {
  createIdea,
  getAllIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea
};
