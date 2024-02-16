const Image = require("../../models/Image");
const Avatar = require("../../models/Avatar");

const uploadFile = async (req, res) => {
  try {
    const NODE_ENV = process.env.NODE_ENV;
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
        environment: NODE_ENV,
      });
    } else {
      // Create a new image document in MongoDB
      newImage = new Image({
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        environment: NODE_ENV,
      });
    }

    await newImage.save();
    res.json({ message: "Image uploaded successfully", newImage });
  } catch (error) {
    res.status(500).send({
      message: "error uploading image",
      error,
    });
  }
};

module.exports = uploadFile;
