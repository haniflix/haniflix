const List = require("../../models/List");
const User = require("../../models/User");

const addMovieToDefaultList = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const movieId = req.body.movieId; // Assuming you receive the movie ID from the client

    // Find the user by their email address
    // const user = await User.findOne({ email: userEmail });
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Find the default list associated with the user
    /*const defaultList = await List.findOne({
        user: user._id, // Match the user's ID
        title: `${user.email}'s Watchlist`, // Assuming the default list has a title "Default"
      });*/

    const createDefaultList = async function (user) {
      let list = new List({
        title: `${user.username}'s Watchlist`,
        user: user._id,
      });
      list = await list.save();
      user.defaultList = list._id;
      await user.save();
      return list;
    };

    let defaultList;

    if (user.defaultList == null) {
      defaultList = await createDefaultList(user);
    } else {
      defaultList = await List.findOne({
        _id: user.defaultList,
        // user: user._id, // Match the user's ID
      });
    }

    if (!defaultList) {
      defaultList = await createDefaultList(user);
      // return res.status(404).json("Default list not found for the user");
    }

    // Add the movie ID to the default list's content array
    if (!defaultList.content.includes(movieId)) {
      // only add if it is not yet in the list
      defaultList.content.push(movieId);
    }

    // Save the updated default list
    const updatedDefaultList = await defaultList.save();

    res.status(200).json(updatedDefaultList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addMovieToDefaultList;
