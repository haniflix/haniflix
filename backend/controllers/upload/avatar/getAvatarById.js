const Avatar = require("../../../models/Avatar");

const getAvatarById = async () => {
  try {
    const id = req.params.id;

    const avatars = await Avatar.findbyId(id);
    res.json({
      avatars,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAvatarById;
