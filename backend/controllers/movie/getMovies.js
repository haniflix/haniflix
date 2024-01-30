const Movie = require("../../models/Movie");

const _ = require("lodash");

const getMovies = async (req, res) => {
  try {
    const params = _.pick(req.query, [
      "orderBy",
      "perPage",
      "page",
      "searchTerm",
      "genre",
    ]);
    const { orderBy, perPage = 20, page = 1, searchTerm, genre } = params;

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
      //
      {
        $lookup: {
          from: "genres",
          localField: "genre",
          foreignField: "_id",
          as: "genre", // Populate full genre objects
        },
      },

      // add likes and dislike counts
      {
        $lookup: {
          from: "movielikes",
          let: { movieId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$movie", "$$movieId"] },
                    { $eq: ["$like", true] },
                  ],
                },
              },
            },
          ],
          as: "likesData",
        },
      },
      {
        $lookup: {
          from: "movielikes",
          let: { movieId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$movie", "$$movieId"] },
                    { $eq: ["$dislike", true] },
                  ],
                },
              },
            },
          ],
          as: "dislikesData",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likesData" },
          dislikesCount: { $size: "$dislikesData" },
        },
      },

      //
      //PAGINATION
      { $skip: skip }, // Apply pagination skip
      { $limit: parseInt(perPage) }, // Apply pagination limit
    ];

    const movieCount = await Movie.countDocuments({
      title: {
        $regex: searchTerm || "", // Match search term in title
        $options: "i", // Case-insensitive search
      },
    });

    const movies = await Movie.aggregate(aggregationPipeline);

    const currentUser = req.user;

    // Populate the likes and dislikes information for the current user
    movies.forEach((movie) => {
      const userLikes = movie.likesData.filter((like) =>
        like.user.equals(currentUser._id)
      );
      const userDislikes = movie.dislikesData.filter((dislike) =>
        dislike.user.equals(currentUser._id)
      );

      movie.currentUserLiked = userLikes.length > 0;
      movie.currentUserDisliked = userDislikes.length > 0;

      delete movie.likesData;
      delete movie.dislikesData;
    });

    res.status(200).json({ movies, totalMovies: movieCount });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json(err);
  }
};

module.exports = getMovies;
