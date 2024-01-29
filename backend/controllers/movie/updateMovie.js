const Movie = require("../../models/Movie");

const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      console.log("req.body ", req.body);

      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log("updatedMovie ", updatedMovie);

      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

module.exports = updateMovie;
