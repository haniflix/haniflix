const multer = require("multer");
const sharp = require("sharp");

// Define file filter function
const fileFilter = (req, file, cb) => {
  // Reject files larger than 1MB
  if (file.size > 1024 * 1024) {
    cb(new Error("File size exceeds 1MB limit"));
  } else {
    cb(null, true);
  }
};

// Middleware for parsing FormData
const upload = multer({
  limits: {
    fileSize: 1024 * 1024, // 1MB file size limit
  },
  fileFilter: fileFilter,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Determine the destination directory based on the value of 'type'
      const destination =
        req.body.type === "avatar" ? "uploads/avatars/" : "uploads/";
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename
    },
  }),
});

// Middleware for compressing images (for avatars)
const compressAvatar = (req, res, next) => {
  if (req.body.type === "avatar" && req.file) {
    sharp(req.file.path)
      .resize({ fit: "inside", width: 200, height: 200 }) // Resize image to fit inside 200x200px
      .toBuffer((err, buffer) => {
        if (err) {
          return next(err);
        }
        // Replace the original file with the compressed one
        req.file.buffer = buffer;
        next();
      });
  } else {
    next();
  }
};

module.exports = { upload, compressAvatar };
