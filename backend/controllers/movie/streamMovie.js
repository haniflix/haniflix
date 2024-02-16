const path = require("path");
const fs = require("fs");

const { Movie } = require("../../models");

// Function to get the base path for movies
const getBasePath = () => {
  return process.env.NODE_ENV === "production"
    ? "/var/www/html/cdn.haniflix.com/movies"
    : path.resolve(__dirname, "..", "..", "../../test_videos");
  // : path.join(__dirname, "..", "..", "test_videos");
};

const streamMovie = async (req, res) => {
  try {
    const NODE_ENV = process.env.NODE_ENV;
    const movieId = req.params.movieId;

    let videoFileName;

    console.log("process.env ", process.env);
    console.log("NODE_ENV ", NODE_ENV);

    if (NODE_ENV === "production") {
      const movieData = await Movie.findById(movieId);

      // Strip the CDN URL from the video URL
      const videoUrl = movieData.video.replace(
        "https://cdn.haniflix.com/movies/",
        ""
      );
      // Extract the file name from the URL
      videoFileName = videoUrl; //decodeURIComponent(videoUrl);
    } else {
      // Default to sample movie in development
      videoFileName = "sample.mov";
    }

    const videoPath = path.join(getBasePath(), videoFileName);

    console.log("videoPath ", videoPath);

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      });

      file.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });

      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(500).send({
      message: "error streaming movie",
      error,
    });
  }
};

module.exports = streamMovie;
