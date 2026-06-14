const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Connection = require("../models/Connection.model");
const User = require("../models/User.model");

const sendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;

  if (receiverId === req.user._id.toString()) {
    throw new ApiError(400, "You cannot send a request to yourself");
  }

  const receiver = await User.findById(receiverId).select("_id");

  if (!receiver) {
    throw new ApiError(404, "Receiver not found");
  }

  const existingConnection = await Connection.findOne({
    $or: [
      { sender: req.user._id, receiver: receiverId },
      { sender: receiverId, receiver: req.user._id }
    ]
  });

  if (existingConnection) {
    throw new ApiError(409, "Request already sent");
  }

  const connection = await Connection.create({
    sender: req.user._id,
    receiver: receiverId
  });

  const response = new ApiResponse(201, { connection }, "Request sent");
  res.status(201).json(response);
});

const getMyConnections = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const connections = await Connection.find({
    $or: [{ sender: userId }, { receiver: userId }]
  })
    .populate("sender", "name avatar role")
    .populate("receiver", "name avatar role")
    .sort({ createdAt: -1 });

  const received = connections.filter(
    (connection) =>
      connection.status === "pending" &&
      connection.receiver._id.toString() === req.user._id.toString()
  );
  const sent = connections.filter(
    (connection) =>
      connection.status === "pending" &&
      connection.sender._id.toString() === req.user._id.toString()
  );
  const connected = connections.filter((connection) => connection.status === "accepted");

  const response = new ApiResponse(
    200,
    { received, sent, connected },
    "Connections fetched"
  );

  res.status(200).json(response);
});

const updateConnectionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    throw new ApiError(400, "Status must be accepted or rejected");
  }

  const connection = await Connection.findById(req.params.id);

  if (!connection) {
    throw new ApiError(404, "Connection not found");
  }

  if (connection.receiver.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only the receiver can update this request");
  }

  connection.status = status;
  await connection.save();

  const response = new ApiResponse(200, { connection }, "Status updated");
  res.status(200).json(response);
});

module.exports = {
  sendRequest,
  getMyConnections,
  updateConnectionStatus
};
