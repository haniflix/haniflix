const List = require("../../models/List");
const User = require("../../models/User");

const getMyLists = async (req, res) => {
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
};

module.exports = getMyLists;
