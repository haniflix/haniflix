const { List } = require("../../models");

const getLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;

  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.find({
          adminList: true,
          type: typeQuery,
          genre: genreQuery,
        }, {
          title: 1,
          type: 1,
          genre: 1,
          content: { $slice: 20 },
          user: 1,
          adminList: 1,
          automaticallyAdded: 1,
          createdAt: 1,
          updatedAt: 1,
        }).sort({ _id: 1 });
      } else {
        list = await List.find({ adminList: true, type: typeQuery }, {
          title: 1,
          type: 1,
          genre: 1,
          content: { $slice: 20 },
          user: 1,
          adminList: 1,
          automaticallyAdded: 1,
          createdAt: 1,
          updatedAt: 1,
        }).sort({
          _id: 1,
        });
      }
    } else {
      list = await List.find({ adminList: true }, {
        title: 1,
        type: 1,
        genre: 1,
        content: { $slice: 20 },
        user: 1,
        adminList: 1,
        automaticallyAdded: 1,
        createdAt: 1,
        updatedAt: 1,
      }).sort({ _id: 1 });
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = getLists;
