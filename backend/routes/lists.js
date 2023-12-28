const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");
const User = require("../models/User");

//CREATE
router.post("/", async (req, res) => {

  if (req.body.email) {
    try {
      // Find the user by their email address
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json("User not found");
      }

      const myList = {
        "user":user._id,
        "title":req.body.title,
        "content":req.body.content,
        "type":req.body.type,
        "genre":req.body.genre
      }

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
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
//router.get("/", verify, async (req, res) => {
router.get("/", async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/my-list/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate({
      path: 'lists',
      populate: {
        path: 'content',
        model: 'Movie',
        select: '_id', // Select only the '_id' field of the Movie model
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userLists = user.lists.map(list => ({
      _id: list._id,
      content: list.content.map(movie => movie._id),
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
      __v: list.__v,
    }));

    res.status(200).json(userLists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post("/add-movie-to-default-list", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const movieId = req.body.movieId; // Assuming you receive the movie ID from the client

    // Find the user by their email address
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Find the default list associated with the user
    const defaultList = await List.findOne({
      user: user._id, // Match the user's ID
      title: `${user.email}'s Watchlist`, // Assuming the default list has a title "Default"
    });

    if (!defaultList) {
      return res.status(404).json("Default list not found for the user");
    }

    // Add the movie ID to the default list's content array
    defaultList.content.push(movieId);

    // Save the updated default list
    const updatedDefaultList = await defaultList.save();

    res.status(200).json(updatedDefaultList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
