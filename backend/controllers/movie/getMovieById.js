const Movie = require("../../models/Movie");
const MovieLikeDislike = require("../../models/MovieLikeDislike");

const getMovieById = async (req, res) => {
  //router.get("/find/:id", verify, async (req, res) => {
  try {
    const movieLikeDislike = await MovieLikeDislike.findOne({
      user: req.user.id,
      movie: req.params.id,
    });
    const movie = await Movie.findById(req.params.id);
    const m = movie?.toObject();
    m.like = movieLikeDislike?.isLike;
    res.status(200).json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = getMovieById;
