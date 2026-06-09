const multer = require("multer");
const { avatarStorage, ideaCoverStorage } = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new ApiError(400, "Only jpg, png, and webp images are allowed"));
  }

  return cb(null, true);
};

const createUploader = (storage) =>
  multer({
    storage,
    fileFilter,
    limits: { fileSize: FILE_SIZE_LIMIT }
  });

const uploadAvatar = createUploader(avatarStorage).single("avatar");
const uploadIdeaCover = createUploader(ideaCoverStorage).single("coverImage");

module.exports = { uploadAvatar, uploadIdeaCover };
