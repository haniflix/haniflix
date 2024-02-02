const List = require("../../models/List");

const getLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;

  console.log("genreQuery ", genreQuery);
  console.log("typeQuery ", typeQuery);

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
};

module.exports = getLists;
