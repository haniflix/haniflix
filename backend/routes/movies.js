const router = require("express").Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const MovieLikeDislike = require("../models/MovieLikeDislike");
const verify = require("../verifyToken");

const _ = require("lodash");

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
    const params = _.pick(req.query, [
      "orderBy",
      "perPage",
      "page",
      "searchTerm",
    ]);
    const { orderBy, perPage = 20, page = 1, searchTerm } = params;

    const skip = (parseInt(page) - 1) * perPage; // Calculate skip for pagination

    let aggregationPipeline = []; // Initialize empty pipeline

    if (searchTerm) {
      aggregationPipeline.push({
        $match: {
          title: {
            $regex: searchTerm, // Match search term in title
            $options: "i", // Case-insensitive search
          },
        },
      });
    }

    // Add sort stage based on "orderBy" parameter
    switch (orderBy) {
      case "descAlpha":
        aggregationPipeline.push({ $sort: { title: -1 } });
        break;
      case "ascAlpha":
        aggregationPipeline.push({ $sort: { title: 1 } });
        break;
      case "dateAddedAsc":
        aggregationPipeline.push({ $sort: { createdAt: 1 } }); // Sort by createdAt in ascending order
        break;
      case "dateAddedDesc":
        aggregationPipeline.push({ $sort: { createdAt: -1 } }); // Sort by createdAt in descending order
        break;
    }

    aggregationPipeline = [
      ...aggregationPipeline,
      {
        $lookup: {
          from: "genres",
          localField: "genre",
          foreignField: "_id",
          as: "genre", // Populate full genre objects
        },
      },

      { $skip: skip }, // Apply pagination skip
      { $limit: parseInt(perPage) }, // Apply pagination limit
    ];

    const movieCount = await Movie.countDocuments({
      title: {
        $regex: searchTerm, // Match search term in title
        $options: "i", // Case-insensitive search
      },
    });

    const movies = await Movie.aggregate(aggregationPipeline);

    res.status(200).json({ movies, totalMovies: movieCount });
  } catch (err) {
    console.log("error ", err);
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

    if (!movieLikeDislike) {
      const dislike = new MovieLikeDislike({
        user: user._id,
        movie: movie._id,
        opinion: "dislike",
      });
      await dislike.save();
    } else {
      movieLikeDislike.opinion = "dislike";
      await movieLikeDislike.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
