const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const createMulterStorageEngine = (folder) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ["jpg", "png", "webp"],
      transformation: [{ quality: "auto", fetch_format: "auto" }]
    }
  });

module.exports = {
  cloudinary,
  createMulterStorageEngine,
  avatarStorage: createMulterStorageEngine("cofound/avatars"),
  ideaCoverStorage: createMulterStorageEngine("cofound/ideas")
};
