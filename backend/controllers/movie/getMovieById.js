const Movie = require("../../models/Movie");
const MovieLike = require("../../models/MovieLikes");

const getMovieById = async (req, res) => {
  //router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    // Count likes and dislikes using aggregation
    const [likesCount, dislikesCount] = await Promise.all([
      MovieLike.countDocuments({ movie: movie._id, like: true }),
      MovieLike.countDocuments({ movie: movie._id, dislike: true }),
    ]);

    // Add likesCount and dislikesCount to the movie object
    const responseMovie = { ...movie.toObject(), likesCount, dislikesCount };

    res.status(200).json(responseMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = getMovieById;
