const User = require("../../models/User");
const CryptoJS = require("crypto-js");

const updatePassword = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      // Encrypt new password
      const encryptedPassword = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.SECRET_KEY
      ).toString();

      // Update user password
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: encryptedPassword,
          },
        },
        { new: true }
      );
      res.status(200).json("Password updated successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
};

module.exports = updatePassword;
