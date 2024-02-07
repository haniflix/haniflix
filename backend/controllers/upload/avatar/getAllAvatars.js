const Avatar = require("../../../models/Avatar");

const getAllAvatars = async (req, res) => {
  // Handle fetching avatar logic here
  try {
    const avatars = await Avatar.find({});
    res.json({
      avatars,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllAvatars;
