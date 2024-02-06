const {
  searchAndScrapeMovies,
  extractMovieInfoFromCdnUrl,
} = require("./functions");
const Logger = require("../../lib/logger");

const Movie = require("../../models/Movie");

const BATCH_SIZE = 5;

//CREATE
const scrapeAllMovies = async (io, req, res) => {
  try {
    console.log("scrape all called");
    // Get the total count of movies that match the filter
    const totalCount = await Movie.countDocuments({
      $or: [
        { title: { $exists: false } },
        { desc: { $exists: false } },
        { img: { $exists: false } },
        { imgTitle: { $exists: false } },
        { year: { $exists: false } },
        { ageRating: { $exists: false } },
        { duration: { $exists: false } },
      ],
    });

    let page = 1;
    let totalPages = Math.ceil(totalCount / BATCH_SIZE);
    let processedCount = 0;

    // Emit details and progress at start
    io.emit("scrapeDetails", {
      total: totalCount,
      processed: processedCount,
    });

    while (page < totalPages + 1) {
      const skip = (page - 1) * BATCH_SIZE;

      const moviesToProcess = await Movie.find({
        $or: [
          { title: { $exists: false } },
          { desc: { $exists: false } },
          { img: { $exists: false } },
          { imgTitle: { $exists: false } },
          { year: { $exists: false } },
          { ageRating: { $exists: false } },
          { duration: { $exists: false } },
        ],
      })
        .skip(skip)
        .limit(BATCH_SIZE);

      const batch = moviesToProcess;
      const movieInfos = [];

      console.log("batch length ", batch?.length);

      for (const movie of batch) {
        const cdnUrl = movie.video; // Update with the correct field containing CDN URL
        const movieInfo = extractMovieInfoFromCdnUrl(cdnUrl, movie?._id);

        if (movieInfo) {
          movieInfos.push(movieInfo);
        }
        processedCount++;
      }

      Logger.info("Batch done");

      await searchAndScrapeMovies(
        movieInfos,
        io,
        totalCount,
        processedCount - 5
      );

      page++;

      console.log("page  ", page);

      // if (page > 1) {
      //   break; // No more pages
      // }
    }

    res.status(200).json({
      success: true,
      message: `${totalCount} scraped and imported`,
    });
  } catch (err) {
    console.log("error ", err);

    res.status(500).json(err);
  }
};

module.exports = scrapeAllMovies;
