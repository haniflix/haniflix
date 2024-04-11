const path = require("path");
const fs = require("fs");

const { Movie } = require("../../models");

const Logger = require("../../lib/logger");

// Function to get the base path for movies
const getBasePath = () => {
  return process.env.IS_IN_DOCKER === "is_docker"
    ? "/usr/movies"
    : path.resolve(__dirname, "..", "..", "../../test videos");
  // : path.join(__dirname, "..", "..", "test_videos");
};

const syncServerMoviesToDatabase = async (req, res) => {
  try {
    const moviesBasePath = getBasePath();

    // Get list of folders (movies) in the base path
    const movies = fs.readdirSync(moviesBasePath);

    // Iterate through each movie folder
    for (const movieFolder of movies) {
      // Construct the full path to the movie folder
      const movieFolderPath = path.join(moviesBasePath, movieFolder);

      // Check if the item is a directory
      const isDirectory = fs.statSync(movieFolderPath).isDirectory();

      // Proceed only if it's a directory
      if (!isDirectory) {
        Logger.info(movieFolderPath + " is not a directory");
        continue;
      }

      // Extract movie title and year from folder name
      const matchRes = movieFolder?.match(/^(.+) \((\d{4})\)/);

      if (!matchRes) {
        Logger.info("No Match result for folder " + movieFolderPath);
        continue;
      }

      const [title, year] = matchRes?.slice(1, 3);

      // Check if the movie with the same title and year exists in the database
      const existingMovie = await Movie.findOne({
        title: `${title} (${year})`,
        year,
      });

      console.log("existingMovie ", existingMovie);

      // If movie already exists, skip
      if (existingMovie) {
        Logger.info("Movie exists " + `${title} (${year})` + " skipping ");
        continue;
      }

      // Get list of files in the movie folder
      const files = fs.readdirSync(path.join(moviesBasePath, movieFolder));

      // Find the movie file in the files list (any file type)
      const movieFile = files.find((file) =>
        /\.(mp4|avi|mkv|mov)$/i.test(file)
      );

      // If movie file exists, construct the URL
      if (movieFile) {
        const movieFileName = movieFile;
        const urlPrefix = "https://cdn.haniflix.com/movies/";
        const movieUrl = `${urlPrefix}${encodeURIComponent(
          movieFolder
        )}/${encodeURIComponent(movieFileName)}`;

        // Log the final result to console
        console.log({
          movieTitle: `${title} (${year})`,
          //  , movieUrl
        });

        // Save the movie to the database
        if (process.env.IS_IN_DOCKER === "is_docker") {
          const movie = new Movie({
            title: `${title} (${year})`,
            video: movieUrl,
            year: year,
          });
          await movie.save();
        }
      }
    }

    // Send response
    res.status(200).send({
      message: "Movies synced successfully",
    });
  } catch (error) {
    console.log("error ", error);
    Logger.error("error: " + error);
    res.status(500).send({
      message: "Error syncing movies",
      error,
    });
  }
};

module.exports = syncServerMoviesToDatabase;
