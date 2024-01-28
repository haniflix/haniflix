const User = require("../../models/User");
const Movie = require("../../models/Movie");
const MovieLikeDislike = require("../../models/MovieLikeDislike");

const likeMovie = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.id);
    const movieLikeDislike = await MovieLikeDislike.findOne({
      user: user._id,
      movie: movie._id,
    });

    if (!movieLikeDislike) {
      const like = new MovieLikeDislike({
        user: user._id,
        movie: movie._id,
        opinion: "like",
      });
      await like.save();
    } else {
      movieLikeDislike.opinion = "like";
      await movieLikeDislike.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
};

module.exports = likeMovie;
