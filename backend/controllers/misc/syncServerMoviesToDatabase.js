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

    const movies = fs.readdirSync(moviesBasePath);

    for (const movieFolder of movies) {
      const movieFolderPath = path.join(moviesBasePath, movieFolder);
      const isFile = fs.statSync(movieFolderPath).isFile();
      if (!isFile) {
        Logger.info(movieFolderPath + " is not a file");
        continue;
      }

      let matchRes = movieFolder?.match(/^(.+?)\.(\d{4})\./);

      if (!matchRes) {
        matchRes = movieFolder?.match(/^(.+?)\s+\(?(\d{4})\)?/);
      }
      if (!matchRes) {
        matchRes = movieFolder?.match(/^(.+?)\.(720p|1080p|BluRay|BRRip|HDRip|x264|X264|AAC|mkv|mp4)/);
      }


      if (!matchRes) {
        Logger.info("No Match result for file " + movieFolderPath);
        continue;
      }

      let [title, year] = matchRes?.slice(1, 3);
      title = title.replace(/\./g, ' ');
      let existingMovie = await Movie.findOne({
        title: title,
        year: year || '',
      });
      if (!existingMovie) {
        existingMovie = await Movie.findOne({
          video: 'https://cdn.haniflix.com/movies/' + movieFolder
        });
      }

      if (existingMovie) {
        Logger.info("Movie exists " + `${title} (${year})` + " skipping ");
        continue;
      }

      const movie = new Movie({
        title: title,
        video: 'https://cdn.haniflix.com/movies/' + movieFolder,
        year: year,
      });
      await movie.save();
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
