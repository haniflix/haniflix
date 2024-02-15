const puppeteer = require("puppeteer");

const { Movie } = require("../../models");
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
    headless: "new",
    // devtools: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 60 * 1000,
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
      new Promise((resolve) => setTimeout(resolve, 2000)),
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
      countInCurrentBatch++;

      while (!addedMovie && retryCount < RETRY_ATTEMPTS) {
        try {
          // Process the movie
          await processMovie(movieInfo);

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

            let updatedMovie = await Movie.findByIdAndUpdate(
              addedMovie?.movieId,
              {
                $set: newFields,
              },
              { new: true }
            );

            if (updatedMovie?.failedDuringScrape == true) {
              updatedMovie = await Movie.findByIdAndUpdate(updatedMovie._id, {
                $unset: { failedDuringScrape: "" },
              });
            }

            await updatedMovie.save();
          }

          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: {
              title: movieInfo?.movieName,
              success: !!addedMovie,
              retryCount: retryCount,
            },
          });
        } catch (error) {
          console.error(`\n\nError processing movie: ${movieInfo.movieName}`);
          Logger.info(
            `Retry count for movie:${movieInfo?.movieId} is ${retryCount}`
          );

          console.error("error in while :", error);

          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: {
              title: movieInfo?.movieName,
              success: false,
              retryCount: retryCount,
            },
          });

          if (retryCount == RETRY_ATTEMPTS - 1) {
            const updatedMovie = await Movie.findByIdAndUpdate(
              movieInfo?.movieId,
              {
                $set: {
                  failedDuringScrape: true,
                },
              },
              { new: true }
            );
          }

          // Retry the same movie
          retryCount++;
        }
      }
    }
  } catch (error) {
    console.log("error in browser ", error);
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
    // page.waitForNetworkIdle({ idleTime: 600 });

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
    await Promise.all([
      page.type(
        'input[data-testid="search-input"]',
        `${movieName} ${movieYear}`
      ),
    ]);

    await page.waitForSelector("#search_dropdown_results", {
      timeout: 60 * 1000 * 2,
    });
    await page.waitForSelector("#search_dropdown_results a"),
      { timeout: 60 * 1000 * 2 };

    // Query all result links
    const resultLinks = await page.$$eval(
      "#search_dropdown_results a",
      (links) =>
        links.map((link) => ({
          title: link.getAttribute("title"),
          href: link.getAttribute("href"),
          titleWithYear: link
            .querySelector(".css-bddqzz.e121vwr03")
            .textContent.trim(),
        }))
    );

    // Filter the result links based on your criteria
    const matchingResult = resultLinks.find((link) => {
      const title = link.title.toLowerCase();
      const titleWithYear = link.titleWithYear.toLowerCase();
      const sanitizedTitle = title.replace(/[^\w\s]/gi, "");

      const href = link.href;

      const sanitizedMovieName = movieName
        .replace(/[^\w\s]/gi, "")
        .toLowerCase();

      const allWordsIncluded = sanitizedMovieName
        .split(" ")
        .every((word) => sanitizedTitle.includes(word));

      const matchesYear =
        href.includes(movieYear) ||
        titleWithYear?.includes(`(${movieYear?.trim()})`);

      return allWordsIncluded && matchesYear;
    });

    if (!matchingResult) {
      console.log("No matching result found.");
      throw {
        message: "No matching result found.",
      };
    }

    // console.log("matchingResult ", matchingResult);
    // console.log("movieYear ", movieYear);
    // console.log("allWordsIncluded", movieName?.toLowerCase().split(" "));

    // Wait for the page to load
    await Promise.all([
      page.waitForNavigation({
        waitUntil: ["domcontentloaded", "load", "networkidle2"],
      }),
      page.goto(`${SEARCH_PAGE_URL}${matchingResult.href}`),
    ]);

    await page.waitForSelector(".css-n6mjxq.e1r3wknn10", {
      timeout: 60 * 1000 * 2,
    });

    // Use the scrapeMovieDetails function to extract movie details
    const movieDetails = await scrapeMovieDetails({ _page: page });

    return movieDetails;

    // } else {
    //   console.log("No matching result found.");
    //   throw {
    //     message: "No matching result found.",
    //   };
    // }
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
