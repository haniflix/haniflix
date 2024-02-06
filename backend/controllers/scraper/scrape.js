const { scrapeMovieDetails } = require("./functions");

//CREATE
const scrapeMovieFromUrl = async (req, res) => {
  try {
    const movieUrl = req.body.url;

    const movieDetails = await scrapeMovieDetails({ url: movieUrl });

    res.status(200).json(movieDetails);
  } catch (err) {
    console.log("error ", err);

    res.status(500).json(err);
  }
};

module.exports = scrapeMovieFromUrl;
