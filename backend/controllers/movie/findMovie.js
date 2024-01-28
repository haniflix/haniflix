const Movie = require("../../models/Movie");

const findMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = findMovieById;
