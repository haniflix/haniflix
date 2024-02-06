const puppeteer = require("puppeteer");

const Movie = require("../../models/Movie");
const Genre = require("../../models/Genre");

const Logger = require("../../lib/logger");

const DELAY_AFTER_MOVIES = 2;
const SEARCH_PAGE_URL = "https://reelgood.com/";

async function scrapeMovieDetails({ _page, url }) {
  //if _page is set url will not be set
  // and vice versa

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let page;

  //if page instance is not created yet, then create with url
  if (!_page) {
    page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });

    //
  } else if (_page instanceof puppeteer.Page) {
    page = _page;
  }

  try {
    let movieDetails = await page.$eval("body", async (body) => {
      const yearOfRelease = body.querySelector(
        ".css-n6mjxq.e1r3wknn10"
      )?.textContent;
      const title = body.querySelector(".css-xuu3cf.e3sx6uc7")?.textContent;

      let fullDescription = body.querySelector(
        ".css-49lcwn.e1qij4j11 p"
      )?.textContent;

      //split desc based on movie title
      let movieDescParts = [];
      if (fullDescription?.includes(`${title} featuring`)) {
        movieDescParts = fullDescription?.split?.(`${title} featuring`);
      } else {
        movieDescParts = fullDescription?.split?.(title);
      }

      let description = movieDescParts[0]?.trim();

      let ageRating = body
        .querySelector('span[title="Maturity rating"]')
        ?.textContent?.trim();
      ageRating = ageRating?.replace("Rated:", "");

      let genre = Array.from(
        body.querySelectorAll(".css-1szmslw.e1r3wknn1 a")
      )?.map((link) => link?.textContent);

      const duration = body.querySelector(
        ".css-1szmslw.e1r3wknn1:last-child"
      )?.textContent;

      //last item is not a genre
      genre = genre?.slice(0, -1);

      const imageUrl = body.querySelector(".css-18pmxw3.edbh37f1")?.src;

      return {
        title,
        // trailerUrl,
        description,
        imageUrl,
        ageRating,
        genre,
        yearOfRelease,
        duration,
      };
    });

    // Return the extracted data
    return movieDetails;
  } catch (error) {
    console.error("Error scraping movie details:", error);
    return {};
  } finally {
    // Close the page if it was created inside this function
    if (!(_page instanceof puppeteer.Page)) {
      await browser.close();
    }
  }
}

/**
 * Extracts Movie Info from reelsgood url
 *
 * @param {string} cdnUrl - The cdn url of the movie.
 * @param {string} movieId - The movieId in db
 */
function extractMovieInfoFromCdnUrl(cdnUrl, movieId) {
  // Extract the part after .com/movies/
  const urlParts = cdnUrl.split(".com/movies/")[1];

  if (urlParts) {
    // Convert encoded characters back to normal string
    const decodedString = decodeURIComponent(urlParts);

    // Define the regular expression pattern for extracting movie name, year, and quality
    const pattern = /([^/]+)\s+\((\d{4})\)\s*\[([^\]]+)\]/;

    // Use RegExp.exec to find the match in the decoded string
    const match = pattern.exec(decodedString);

    // Check if there is a match
    if (match) {
      // Extract movie name, year, and quality from the matched groups
      const movieName = match[1].replace(/%20/g, " ");
      const movieYear = match[2];
      const movieQuality = match[3];

      return { movieName, movieYear, movieQuality, movieId };
    }
  }

  return null;
}

//array of movies
/**
 * Extracts Movie Info from reelsgood url
 *
 * @param {number} totalCount - Total movies count that match criteria.
 * @param {number} currentCount - The current count in the batch from mongoose
 * @param {any} io - Socket.io server instance
 */
async function searchAndScrapeMovies(movieInfos, io, totalCount, currentCount) {
  let countInCurrentBatch = 0;
  const processedMoviesData = [];

  const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode
    // devtools: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    await page.setViewport({ width: 1066, height: 768 });
    await page.goto(SEARCH_PAGE_URL, {
      waitUntil: ["domcontentloaded", "networkidle2", "load"],
    });

    // Fill input with dummy text
    await page.type('input[data-testid="search-input"]', "dummy text");

    // Create a promise that resolves after the input is cleared
    const waitForInputClear = async () => {
      await page.waitForFunction(
        'document.querySelector(\'input[data-testid="search-input"]\').value === ""'
      );
    };

    // Use Promise.race to either wait for input clearing or timeout
    await Promise.race([
      waitForInputClear(),
      new Promise((resolve) => setTimeout(resolve, 3500)),
    ]);

    // Define an asynchronous function to handle each movie search and scrape
    const processMovie = async (movieInfo) => {
      // Search and scrape movie details
      const movieDetail = await searchAndScrapeMovie(
        page,
        movieInfo.movieName,
        movieInfo.movieYear
      );

      if (movieDetail) {
        processedMoviesData.push({
          ...movieDetail,
          movieId: movieInfo?.movieId,
        });
      }

      // Clear the input field for the next search
      await page.$eval(
        'input[data-testid="search-input"]',
        (input) => (input.value = "")
      );
    };

    // Use for...of loop with await to ensure sequential processing
    for (const movieInfo of movieInfos) {
      let addedMovie;
      let retryCount = 0;
      const RETRY_ATTEMPTS = 3;

      while (!addedMovie && retryCount < RETRY_ATTEMPTS) {
        try {
          // Process the movie
          await processMovie(movieInfo);

          //when a movie is retrying its count must not be updated
          if (retryCount == 0) {
            countInCurrentBatch++;
          }

          addedMovie = processedMoviesData?.find(
            (processedMovieData) =>
              processedMovieData?.movieId == movieInfo?.movieId
          );

          if (addedMovie) {
            /**
             * update movie in database
             */

            //process genres
            let genreIds = [];

            for (const genreItem of addedMovie?.genre) {
              const findGenreMatch = await Genre.findOne({
                title: genreItem?.toLowerCase(),
              });

              if (findGenreMatch) {
                // already stored in db
                genreIds.push(findGenreMatch._id);
                continue;
              }

              //create new genre, if none is found
              const newGenre = new Genre({ title: genreItem?.toLowerCase() });

              const savedGenre = await newGenre.save();
              genreIds.push(savedGenre._id);
            }

            const newFields = {
              title: addedMovie?.title,
              desc: addedMovie?.description,
              img: addedMovie?.imageUrl,
              imgTitle: addedMovie?.imageUrl,
              ageRating: addedMovie?.ageRating,
              duration: addedMovie?.duration,
              year: addedMovie?.yearOfRelease,
              genre: genreIds,
            };

            const updatedMovie = await Movie.findByIdAndUpdate(
              addedMovie?.movieId,
              {
                $set: newFields,
              },
              { new: true }
            );
          }

          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: {
              title: movieInfo?.movieName,
              success: !!addedMovie,
            },
          });
        } catch (error) {
          console.error(`Error processing movie: ${movieInfo.movieName}`);
          Logger.info(
            `Retry count for movie:${movieInfo?.movieId} is ${retryCount}`
          );

          console.error(error);

          // Retry the same movie
          retryCount++;
        }
      }
    }
  } finally {
    await browser.close();
  }
}

/**
 * Searches for a movie and scrapes relevant information.
 *
 * @param {puppeteer.Page} page - A Puppeteer Page object representing the browser page.
 * @param {string} movieName - The name of the movie to search for.
 * @param {number} movieYear - The release year of the movie.
 */
async function searchAndScrapeMovie(page, movieName, movieYear) {
  try {
    // Type the search term into the input field
    // Check if input field is already filled (optimization)
    const isInputFilled = await page.$eval(
      'input[data-testid="search-input"]',
      (input) => input.value.trim() !== ""
    );

    if (isInputFilled) {
      // Clear the input field
      await page.$eval(
        'input[data-testid="search-input"]',
        (input) => (input.value = "")
      );
    }

    // Type the movie name and year into the input field
    await page.type(
      'input[data-testid="search-input"]',
      `${movieName} ${movieYear}`
      //   { delay: 30 }
    );

    // Wait for the autocomplete list to be rendered
    await page.waitForSelector("#search_dropdown_results");
    // console.log("results loading icon showing, now waiting for links");
    await page.waitForSelector("#search_dropdown_results a");
    //console.log("link results found");

    // Check if the first item matches the criteria
    const firstResult = await page.$("#search_dropdown_results a");

    if (!firstResult) {
      console.log("No search results found.");
      throw {
        message: "No search results found.",
      };
    }

    const title = await page.$eval("#search_dropdown_results a", (link) =>
      link.getAttribute("title")
    );
    const href = await page.$eval("#search_dropdown_results a", (link) =>
      link.getAttribute("href")
    );

    // Check if all words in the movieName are present in the title
    const allWordsIncluded = movieName
      ?.toLowerCase()
      .split(" ")
      .every((word) => title.toLowerCase().includes(word));

    // console.log("title ", title);
    // console.log("movieName ", movieName);
    // console.log("allWordsIncluded check", allWordsIncluded);
    // console.log("allWordsIncluded", movieName?.toLowerCase().split(" "));
    // console.log("href ", href);
    // console.log("movieYear ", movieYear);

    // Check if the title and href contain the movieName and movieYear
    if (allWordsIncluded && href.includes(movieYear)) {
      // Click on the first result

      // Wait for the page to load
      await Promise.all([
        page.waitForNavigation({
          waitUntil: ["domcontentloaded", "load", "networkidle0"],
        }),
        page.goto(`${SEARCH_PAGE_URL}${href}`),
        // page.click("#search_dropdown_results a"),
      ]);

      await page.waitForSelector(".css-n6mjxq.e1r3wknn10");

      // Use the scrapeMovieDetails function to extract movie details
      const movieDetails = await scrapeMovieDetails({ _page: page });

      return movieDetails;
    } else {
      console.log("No matching result found.");
      throw {
        message: "No matching result found.",
      };
    }
  } catch (error) {
    console.error("Error searching and scraping movie:", error);

    throw error;
  }
  //   finally {
  // await browser.close();
  // console.log("in finally ");
  //   }
}

module.exports = {
  scrapeMovieDetails,
  extractMovieInfoFromCdnUrl,
  searchAndScrapeMovies,
};
