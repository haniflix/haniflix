const router = require("express").Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const MovieLikeDislike = require("../models/MovieLikeDislike");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
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
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  //router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM
router.get("/random", async (req, res) => {
  //router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else if (type === "movies") {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE
router.get("/:id", verify, async (req, res) => {
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
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//Like movie
router.post("/:id/like", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.id);
    const movieLikeDislike = await MovieLikeDislike.findOne({
      user: user._id,
      movie: movie._id,
    });
    if (movieLikeDislike == null) {
      const like = new MovieLikeDislike({
        user: user._id,
        movie: movie._id,
        isLike: true,
      });
      await like.save();
    } else {
      if (movieLikeDislike.isLike) {
        await MovieLikeDislike.findByIdAndDelete(movieLikeDislike.id);
      } else {
        await MovieLikeDislike.findOneAndUpdate(movieLikeDislike.id, {
          $set: {
            isLike: true,
          },
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

//Dislike movie
router.post("/:id/dislike", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.id);
    const movieLikeDislike = await MovieLikeDislike.findOne({
      user: user._id,
      movie: movie._id,
    });
    if (movieLikeDislike == null) {
      const dislike = new MovieLikeDislike({
        user: user._id,
        movie: movie._id,
        isLike: false,
      });
      await dislike.save();
    } else {
      if (!movieLikeDislike.isLike) {
        await MovieLikeDislike.findByIdAndDelete(movieLikeDislike.id);
      } else {
        await MovieLikeDislike.findOneAndUpdate(movieLikeDislike.id, {
          $set: {
            isLike: false,
          },
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
