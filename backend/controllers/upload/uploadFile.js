const Image = require("../../models/Image");
const Avatar = require("../../models/Avatar");

const uploadFile = async (req, res) => {
  // Handle file upload logic here
  const file = req.file;
  const type = req.body.type; // Access 'type' sent as FormData

  if (!file || !type) {
    return res.status(400).json({ error: "Missing file or image type" });
  }

  let newImage;

  if (type == "avatar") {
    if (!req.user.isAdmin) {
      return res.status(401).send({
        message: "Unauthorized call",
      });
    }

    newImage = new Avatar({
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
  } else {
    // Create a new image document in MongoDB
    newImage = new Image({
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
  }

  await newImage.save();
  res.json({ message: "Image uploaded successfully", newImage });
};

module.exports = uploadFile;
