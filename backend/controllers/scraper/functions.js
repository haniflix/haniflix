const puppeteer = require("puppeteer");

const { Movie } = require("../../models");
const Genre = require("../../models/Genre");

const Logger = require("../../lib/logger");

const DELAY_AFTER_MOVIES = 2;

const NODE_ENV = process.env.NODE_ENV;

// must match batch size in scrapeAll.js
const BATCH_SIZE = 5;
//
const SEARCH_PAGE_URL = "https://reelgood.com/";
let pageInstanceForMultiple;

let browser; // Declare browser instance globally

async function initBrowser() {
  try {
    browser = await puppeteer.launch({
      headless: NODE_ENV == "production" ? "new" : false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 60 * 1000,
    });
  } catch (error) {
    Logger.error(`Error while initializing browser : ${error}`);
  }
}

async function closeBrowser() {
  try {
    await browser.close();
    browser = undefined;
  } catch (error) {
    Logger.error(`Error while closing browser : ${error}`);
  }
}

const checkPageIsReady = async (page) => {
  // Fill input with dummy text
  await page.type('input[data-testid="search-input"]', "dummy text");

  // Create a promise that resolves after the input is cleared
  const waitForInputClear = async () => {
    console.log("wait for input clear successful");
    await page.waitForFunction(
      'document.querySelector(\'input[data-testid="search-input"]\').value === ""'
    );
  };

  // Use Promise.race to either wait for input clearing or timeout
  await Promise.race([
    waitForInputClear(),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]);
};

async function scrapeMovieDetails({ _page, url }) {
  //if _page is set url will not be set
  // and vice versa

  let browserInitializedLocally = false;

  if (!browser) {
    await initBrowser();
    browserInitializedLocally = true;
  }

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
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url, {
      waitUntil: ["domcontentloaded", "networkidle2", "load"],
    });

    //
  } else if (_page instanceof puppeteer.Page) {
    page = _page;
  }

  try {
    //wait for large image
    const waitLargeImg = async () => {
      await page.waitForSelector("picture.css-cxmmyk.edbh37f0 link", {
        timeout: 60 * 1000,
      });
    };

    await Promise.race([
      waitLargeImg(),
      new Promise((resolve) => setTimeout(resolve, 15 * 1000)),
    ]);

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

      // const imageUrl = body.querySelector(".css-18pmxw3.edbh37f1")?.src;

      let sourceElements = body?.querySelectorAll(
        "picture.css-cxmmyk.edbh37f0 source"
      );

      //set imageurl with smallest image
      let imageUrl = undefined;
      let largestPosterSize = 0;
      let sourceUrls;
      let sourceSrcSets = [];

      sourceElements.forEach((sourceElement) => {
        const srcset = sourceElement?.getAttribute("srcset");
        sourceSrcSets.push(srcset);
        sourceUrls = srcset
          ?.split(",")
          .filter((item) => item?.includes("poster"))
          .map((item) => {
            const [url, size] = item?.trim()?.split(" ");
            return { url, size: parseInt(size) || 0 };
          });

        //for background image
        sourceUrls?.forEach(({ url, size }) => {
          if (size > largestPosterSize) {
            largestPosterSize = size;
            imageUrl = url;
          }
        });
      });

      let linkSourceElements = body?.querySelectorAll(
        "picture.css-cxmmyk.edbh37f0 link"
      );

      let largestSize = 0;
      let largestImageUrl = undefined;
      let urls;
      let srcSets = [];

      linkSourceElements.forEach((sourceElement) => {
        const srcset = sourceElement?.getAttribute("imagesrcset");
        urls = srcset?.split(",").map((item) => {
          const [url, size] = item?.trim()?.split(" ");
          return { url, size: parseInt(size) || 0 };
        });

        //for background image
        urls?.forEach(({ url, size }) => {
          if (size > largestSize) {
            largestSize = size;
            largestImageUrl = url;
          }
        });
      });

      if (!imageUrl) {
        imageUrl = body.querySelector(".css-18pmxw3.edbh37f1")?.src;
      }

      if (!largestImageUrl) {
        largestImageUrl = imageUrl?.replace("poster-185", "backdrop-1280");
      }

      return {
        title,
        // trailerUrl,
        // srcSets,
        // urls,
        // sourceUrls,
        // sourceSrcSets,
        description,
        imageUrl,
        largestImageUrl,
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
    Logger.error("Error scraping movie details:" + error);
    return {};
  } finally {
    // Close the page if it was created inside this function
    if (!(_page instanceof puppeteer.Page)) {
      // await browser.close();
      await page.close();
    }
    if (browserInitializedLocally) {
      // await browser.close();
      await closeBrowser();
    }
  }
}

//array of movies
/**
 * Extracts Movie Info from reelsgood url
 *
 * @param {number} movieInfos -Array of movieInfo objects {name, year, movieId}.
 * @param {number} totalCount - Total movies count that match criteria.
 * @param {number} currentCount - The current count in the batch from mongoose
 * @param {any} io - Socket.io server instance
 * @param {Function} setProcessedCount - set processed movies count
 * @param {boolean} stopProcess - boolean to determine continuation of api call
 */
async function searchAndScrapeMovies(
  movieInfos,
  io,
  totalCount,
  currentCount,
  batchCount,
  setProcessedCount,
  stopProcess
) {
  let countInCurrentBatch = 0;
  const processedMoviesData = [];
  page = pageInstanceForMultiple;

  console.log("movieInfos ", movieInfos);

  if (!browser) {
    await initBrowser();
  }

  try {
    if (!pageInstanceForMultiple) {
      page = await browser.newPage();
      pageInstanceForMultiple = page;
    }

    page.on("console", (msg) => {
      // console.log(msg.text());
      // Logger.debug("From Puppeteer console: \n" + msg.text());
    });

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(SEARCH_PAGE_URL, {
      waitUntil: ["domcontentloaded", "networkidle2", "load"],
    });

    //check if page is ready
    await checkPageIsReady(page);

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
          cdnUrlMovieName: movieInfo?.movieName,
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

      // a while loop to keep retrying till RETRY_ATTEMPTS
      while (!addedMovie && retryCount <= RETRY_ATTEMPTS) {
        try {
          // Process the movie
          await processMovie(movieInfo);

          // Check if the process should stop ( takes effect in next batch )
          if (stopProcess) {
            console.log("Scraping process stopped remotely.");
            Logger.info("Scraping process stopped remotely.");
            break; // Exit the loop immediately
          }

          //logic to check if movie in this loop has already been processed
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

            if (Array.isArray(addedMovie?.genre)) {
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
            }

            const newFields = {
              title: addedMovie?.title,
              desc: addedMovie?.description,
              img: addedMovie?.imageUrl,
              imgTitle: addedMovie?.largestImageUrl || addedMovie?.imageUrl,
              ageRating: addedMovie?.ageRating,
              duration: addedMovie?.duration,
              year: addedMovie?.yearOfRelease,
              genre: genreIds,
            };

            // add final check to ensure movie matches the name before adding details to db
            let pulledMovieName = addedMovie?.title;
            let cdnUrlMovieName = addedMovie?.cdnUrlMovieName;

            pulledMovieName = pulledMovieName
              .replace(/[^\w\s]/gi, "")
              .toLowerCase();
            cdnUrlMovieName = cdnUrlMovieName
              .replace(/[^\w\s]/gi, "")
              .toLowerCase();

            //
            const allMovieWordsIncluded = cdnUrlMovieName
              ?.trim()
              .split(" ")
              .every((word) => {
                return pulledMovieName.includes(word);
              });

            if (!allMovieWordsIncluded) {
              throw {
                message: "DB movie details not matching with pulled data",
              };
            }

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

          // Update processedCount via the setter function
          setProcessedCount(currentCount + countInCurrentBatch);

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
          Logger.error(`\n\nError processing movie: ${movieInfo.movieName}`);
          Logger.info(
            `Retry count for movie:${movieInfo?.movieId} is ${retryCount}`
          );

          console.error("error in while :", error);

          // Update processedCount via the setter function
          setProcessedCount(currentCount + countInCurrentBatch);

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
    Logger.error(`error in browser : ${JSON.stringify(error)}`);
  } finally {
    //  Logger.debug("Browser finally reached");

    let processed = countInCurrentBatch + currentCount;

    //close if its the final movie
    // sometimes some batches movies dont get processed at all
    if (processed >= totalCount || BATCH_SIZE * batchCount >= totalCount) {
      await closeBrowser();
    }
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

    // keep trying to type movie name into search
    for (let retries = 0; retries < 3; retries++) {
      try {
        await page.type(
          'input[data-testid="search-input"]',
          `${movieName} ${movieYear}`
        );

        await new Promise((r) => setTimeout(r, 1500));

        // Verify input value after typing
        const actualValue = await page.$eval(
          'input[data-testid="search-input"]',
          (input) => input.value.trim()
        );
        console.log("Actual input value:", actualValue);

        if (actualValue !== "") {
          break; // Success, exit retry loop
        } else {
          console.warn("Typing failed, retrying...", retries + 1);
          await new Promise((r) => setTimeout(r, 2000)); // Add a short delay between retries
        }
      } catch (error) {
        console.error("Error typing search term:", error);
        // Handle specific errors if needed
      }
    }

    // Check if typing was successful after retries
    const actualValue = await page.$eval(
      'input[data-testid="search-input"]',
      (input) => input.value.trim()
    );
    if (actualValue === "") {
      throw {
        message: "Input field is empty after retries",
      };
    }

    await page.waitForSelector("#search_dropdown_results", {
      timeout: 60 * 1000 * 2,
    });
    await page.waitForSelector("#search_dropdown_results a", {
      timeout: 60 * 1000 * 2,
    });

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

    //check if page is ready
    await checkPageIsReady(page);

    //wait until movie title is displayed on movie page
    await page.waitForSelector(".css-xuu3cf.e3sx6uc7", {
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
    Logger.error("Error searching and scraping movie:" + JSON.stringify(error));

    throw error;
  }
  //   finally {
  // await browser.close();
  // console.log("in finally ");
  //   }
}

module.exports = {
  scrapeMovieDetails,
  searchAndScrapeMovies,
};
