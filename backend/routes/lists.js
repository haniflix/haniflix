const router = require("express").Router();
const List = require("../models/List");
const verify = require("../middleware/verifyToken");
const User = require("../models/User");

const _ = require("lodash");

//CREATE
router.post("/", verify, async (req, res) => {
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
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user?.email) {
    try {
      // Find the user by their email address
      // const user = await User.findOne({ email: req.body.email });
      const list = await List.findById(req.params.id);

      if (user._id == list._id || user.isAdmin) {
        const updatedList = await List.findByIdAndUpdate(req.params.id, {
          $set: {
            title: req.body.title,
            content: req.body.content,
            type: req.body.type,
            genre: req.body.genre,
          },
        });

        return res.status(200).json(updatedList);
      }
      return res.status(401).json("Unauthorized");

      /* const myList = {
        user: user._id,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        genre: req.body.genre,
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

      res.status(201).json(savedList);*/
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
        /*list = await List.aggregate([
          { $sample: { size: 10000 } },
          { $sort: { _id: 1 }},
          { $match: { type: typeQuery, genre: genreQuery, adminList: true } },
        ]);*/
        list = await List.find({
          adminList: true,
          type: typeQuery,
          genre: genreQuery,
        }).sort({ _id: 1 });
      } else {
        /*list = await List.aggregate([
          { $sample: { size: 10000 } },
          { $sort: { _id: 1 }},
          { $match: { type: typeQuery, adminList: true } },
        ]);*/
        list = await List.find({ adminList: true, type: typeQuery }).sort({
          _id: 1,
        });
      }
    } else {
      //list = await List.aggregate([{ $sample: { size: 10 } }]);
      list = await List.find({ adminList: true }).sort({ _id: 1 });
      /*list = await List.aggregate([
          { $sort: { createdAt: 1 }},
	  { $sample: { size: 10000 } },
          { $match: { adminList: true } },
      ]);*/
    }
    // res.status(200).json(list.filter((l) => l.adminList));
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/admin-list", verify, async (req, res) => {
  try {
    const params = _.pick(req.query, ["orderBy"]);
    const orderBy = params.orderBy;

    const aggregationPipeline = []; // Initialize empty pipeline

    // match stage
    aggregationPipeline.push({ $match: { adminList: true } });

    // Add sort stage based on "orderBy" parameter
    switch (orderBy) {
      case "descAlpha":
        aggregationPipeline.push({ $sort: { title: -1 } });
        break;
      case "ascAlpha":
        aggregationPipeline.push({ $sort: { title: 1 } });
        break;
      default:
        aggregationPipeline.push({ $sort: { _id: 1 } });
        break;
    }

    const list = await List.aggregate(aggregationPipeline);

    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/my-list/:email", verify,async (req, res) => {
router.get("/my-list", verify, async (req, res) => {
  try {
    /*const user = await User.findOne({ email: req.params.email }).populate({
      path: "lists",
      populate: {
        path: "content",
        model: "Movie",
        select: "_id", // Select only the '_id' field of the Movie model
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLists = user.lists.map((list) => ({
      _id: list._id,
      content: list.content.map((movie) => movie._id),
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
      __v: list.__v,
    }));

    res.status(200).json(userLists);*/
    const user = await User.findById(req.user.id);
    const defaultList = await List.findOne({
      _id: user.defaultList,
      //adminList: false,
    });
    const nonDefaultLists = await List.find({
      user: user._id,
      //adminList: false,
      _id: { $not: { $eq: user.defaultList } },
    });
    /*const nonDefaultLists = userLists?.filter(
      (list) => list._id != user.defaultList
    );*/
    // we want the default list to always come first

    res
      .status(200)
      .json([defaultList, ...nonDefaultLists].filter((list) => list != null));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-movie-to-default-list", verify, async (req, res) => {
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
});

module.exports = router;
