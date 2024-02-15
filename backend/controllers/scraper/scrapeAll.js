const {
  searchAndScrapeMovies,
  extractMovieInfoFromCdnUrl,
} = require("./functions");
const Logger = require("../../lib/logger");

const { Movie } = require("../../models");

const BATCH_SIZE = 5;

const NODE_ENV = process.env.NODE_ENV;

//CREATE
const scrapeAllMovies = async (io, req, res) => {
  try {
    let query = {};

    if (NODE_ENV == "development") {
      query = {
        $and: [
          {
            $or: [
              { title: { $exists: false } },
              { desc: { $exists: false } },
              { img: { $exists: false } },
              { imgTitle: { $exists: false } },
              { year: { $exists: false } },
              { ageRating: { $exists: false } },
              { duration: { $exists: false } },
            ],
          },
          {
            $or: [
              { failedDuringScrape: { $exists: false } },
              { failedDuringScrape: false },
            ],
          },
        ],
      };
    }

    // Get the total count of movies that match the filter
    const totalCount = await Movie.countDocuments(query);

    let page = 1;
    let totalPages = Math.ceil(totalCount / BATCH_SIZE);
    let processedCount = 0;
    let batchCount = 1;

    // Emit details and progress at start
    io.emit("scrapeDetails", {
      total: totalCount,
      processed: processedCount,
    });

    while (page < totalPages + 1) {
      const skip = (page - 1) * BATCH_SIZE;
      Logger.info(`Batch ${batchCount} starting -----`);

      const moviesToProcess = await Movie.find(query)
        .skip(skip)
        .limit(BATCH_SIZE);

      const batch = moviesToProcess;
      const movieInfos = [];

      for (const movie of batch) {
        const cdnUrl = movie.video; // Update with the correct field containing CDN URL
        const movieInfo = extractMovieInfoFromCdnUrl(cdnUrl, movie?._id);

        if (movieInfo) {
          movieInfos.push(movieInfo);
        }
        processedCount++;
      }

      await searchAndScrapeMovies(
        movieInfos,
        io,
        totalCount,
        processedCount - 5
      );

      page++;

      Logger.info(`Batch ${batchCount} complete -----`);
      batchCount++;
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
