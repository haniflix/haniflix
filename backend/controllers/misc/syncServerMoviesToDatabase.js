
const axios = require("axios");
const cheerio = require("cheerio");
const { Movie } = require("../../models");

const syncServerMoviesToDatabase = async (req, res) => {
  try {

    console.log("Function started")
    const response = await axios.get("https://cdn.haniflix.com/movies/");
    const html = response.data;

    const $ = cheerio.load(html);
    const anchorTags = $("a[href]");
    const movieUrls = anchorTags
      .map((index, element) => $(element).attr("href"))
      .get()
      .filter(url => /\.(mp4|avi|mkv|mov)$/i.test(url));

    console.log('movieUrls: ', movieUrls)
    // Log the list of movie URLs
    movieUrls.map(async (x) => {
      console.log(x)
      const match = x?.match(/^(.+?)\.(\d{4})\..+$/);
      let title, year
      console.log(match)
      if (match) {
        title = match[1].replace(/\./g, ' '); // Replace dots with spaces
        year = match[2];
      } else {
        title = ''
        year = ''
      }
      console.log(title, year, x)
      const movie = new Movie({
        title: title,
        video: 'https://cdn.haniflix.com/movies/' + x,
        year: year,
      });
      await movie.save();
    })

    res.status(200).send({
      message: "Movies synced successfully",
      movieUrls: movieUrls
    });
  } catch (error) {
    console.log("error ", error);
    res.status(500).send({
      message: "Error syncing movies",
      error,
    });
  }
};

module.exports = syncServerMoviesToDatabase;

