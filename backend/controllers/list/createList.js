const List = require("../../models/List");
const User = require("../../models/User");

const createList = async (req, res) => {
  try {
    // Find the user by their email address
    // const user = await User.findOne({ email: req.body.email });
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    const myList = {
      user: user._id,
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      genre: req.body.genre,
      adminList: user.isAdmin,
    };

    // Create a new list
    const newList = new List(myList);

    // Set the user for the new list
    newList.user = user;

    // Save the new list
    const savedList = await newList.save();

    // Update the user's lists array with the newly created list's ObjectId
    user.lists.push(savedList._id);

    // Save the updated user
    await user.save();

    res.status(201).json(savedList);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = createList;
