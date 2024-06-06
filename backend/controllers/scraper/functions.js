const puppeteer = require("puppeteer");
const { Movie } = require("../../models");
const Genre = require("../../models/Genre");
const Logger = require("../../lib/logger");

const DELAY_AFTER_MOVIES = 2;
const BATCH_SIZE = 5;
const SEARCH_PAGE_URL = "https://reelgood.com/";

let pageInstanceForMultiple;
let browser;

async function initBrowser() {
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 3 * 60 * 1000,
      protocolTimeout: 5 * 60 * 1000,
    });
  } catch (error) {
    Logger.error(`Error while initializing browser: ${error}`);
  }
}

async function closeBrowser() {
  try {
    if (browser) {
      await browser.close();
      browser = undefined;
    }
  } catch (error) {
    Logger.error(`Error while closing browser: ${error}`);
  }
}

const checkPageIsReady = async (page) => {
  try {
    await page.waitForSelector('input[data-testid="search-input"]');
    await page.type('input[data-testid="search-input"]', "dummy text");
    await page.evaluate(() => {
      document.querySelector('input[data-testid="search-input"]').value = "";
    });
    await page.waitForFunction(
      'document.querySelector(\'input[data-testid="search-input"]\').value === ""'
    );
  } catch (error) {
    Logger.error(`Error in checkPageIsReady: ${error}`);
  }
};

async function scrapeMovieDetails({ _page, url }) {
  let browserInitializedLocally = false;

  if (!browser) {
    await initBrowser();
    browserInitializedLocally = true;
  }

  let page;

  try {
    if (!_page) {
      page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });
      await page.setUserAgent("Mozilla/5.0 ... Chrome/66.0.3359.181 Safari/537.36");
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto(url, {
        waitUntil: ["domcontentloaded", "networkidle2", "load"],
      });
    } else if (_page instanceof puppeteer.Page) {
      page = _page;
    }

    const movieDetails = await page.$eval("body", (body) => {
      // Scrape the required data
      let yearOfRelease = body.querySelector(".e1dskkhw7.css-1i5l3f2.e83cah30")?.textContent;
      yearOfRelease = yearOfRelease?.replace("(", "")?.replace(")", "");
      const title = body.querySelector(".css-hiz1q1.e3s42hj0")?.textContent;

      let fullDescription = body.querySelector(".css-49lcwn.e1qij4j11 p")?.textContent;
      let movieDescParts = fullDescription?.includes(`${title} featuring`)
        ? fullDescription?.split(`${title} featuring`)
        : fullDescription?.split(title);
      let description = movieDescParts[0]?.trim();

      let ageRating = body.querySelector(".css-si6acb.eytn0nr3")?.textContent;

      const genreDiv = body.querySelector(".css-swt64r.ex9d9ik0");
      let genre = [];
      if (genreDiv) {
        const links = genreDiv.querySelectorAll("a");
        const filteredLinks = Array.from(links).filter(link => link.getAttribute('href').startsWith('/movies/genre'));

        for (let i = 0; i < Math.min(filteredLinks.length, 2); i++) {
          genre.push(filteredLinks[i].textContent);
        }
      }

      const duration = body.querySelector(".css-1r35rcf.e1dskkhw11")?.textContent;
      const imageUrl = body.querySelector(".eytn0nr13 .css-18pmxw3.edbh37f1")?.src;
      let largestImageUrl = imageUrl?.replace(/poster-\d+/, "backdrop-1280");

      return {
        title,
        description,
        imageUrl,
        largestImageUrl,
        ageRating,
        genre,
        yearOfRelease,
        duration,
      };
    });

    return movieDetails;
  } catch (error) {
    Logger.error(`Error scraping movie details: ${error}`);
    return {};
  } finally {
    if (!_page) {
      await page.close();
    }
    if (browserInitializedLocally) {
      await closeBrowser();
    }
  }
}
async function searchAndScrapeMovies(
  movieInfos,
  io,
  totalCount,
  currentCount,
  batchCount,
  setProcessedCount,
  _stopProcess,
  setCallBack
) {
  let stopProcess = _stopProcess;
  let countInCurrentBatch = 0;
  const processedMoviesData = [];
  page = pageInstanceForMultiple;

  console.log("Function Staretd")

  setCallBack({});

  if (!browser) {
    await initBrowser();
  }

  try {
    if (!pageInstanceForMultiple) {
      page = await browser.newPage();
      pageInstanceForMultiple = page;
    }

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent("Mozilla/5.0 ... Chrome/66.0.3359.181 Safari/537.36");
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(SEARCH_PAGE_URL, {
      waitUntil: ["domcontentloaded", "networkidle2", "load"],
    });

    await checkPageIsReady(page);

    const processMovie = async (movieInfo) => {
      const movieDetail = await searchAndScrapeMovie(page, movieInfo.movieName, movieInfo.movieYear);
      if (movieDetail) {
        processedMoviesData.push({
          ...movieDetail,
          movieId: movieInfo.movieId,
          cdnUrlMovieName: movieInfo.movieName,
        });
      }
      await page.$eval('input[data-testid="search-input"]', (input) => (input.value = ""));
    };

    for (const movieInfo of movieInfos) {
      let addedMovie;
      let retryCount = 0;
      const RETRY_ATTEMPTS = 3;
      countInCurrentBatch++;

      while (!addedMovie && retryCount <= RETRY_ATTEMPTS) {
        try {
          await processMovie(movieInfo);

          if (stopProcess) {
            await closeBrowser();
            break;
          }

          addedMovie = processedMoviesData.find((processedMovieData) => processedMovieData.movieId == movieInfo.movieId);

          if (addedMovie) {
            let genreIds = [];
            if (Array.isArray(addedMovie.genre)) {
              for (const genreItem of addedMovie.genre) {
                const findGenreMatch = await Genre.findOne({ title: genreItem.toLowerCase() });
                if (findGenreMatch) {
                  genreIds.push(findGenreMatch._id);
                  continue;
                }
                const newGenre = new Genre({ title: genreItem.toLowerCase() });
                const savedGenre = await newGenre.save();
                genreIds.push(savedGenre._id);
              }
            }

            const newFields = {
              title: addedMovie.title,
              desc: addedMovie.description,
              img: addedMovie.imageUrl,
              imgTitle: addedMovie.largestImageUrl || addedMovie.imageUrl,
              ageRating: addedMovie.ageRating,
              duration: addedMovie.duration,
              year: addedMovie.yearOfRelease,
              genre: genreIds,
            };

            let pulledMovieName = addedMovie.title.replace(/[^\w\s]/gi, "").toLowerCase();
            let cdnUrlMovieName = addedMovie.cdnUrlMovieName.replace(/[^\w\s]/gi, "").toLowerCase();
            const allMovieWordsIncluded = cdnUrlMovieName.trim().split(" ").every((word) => pulledMovieName.includes(word));

            if (!allMovieWordsIncluded) {
              throw { message: "DB movie details not matching with pulled data" };
            }

            let updatedMovie = await Movie.findByIdAndUpdate(addedMovie.movieId, { $set: newFields }, { new: true });
            if (updatedMovie.failedDuringScrape == true) {
              updatedMovie = await Movie.findByIdAndUpdate(updatedMovie._id, { $unset: { failedDuringScrape: "" } });
            }
            await updatedMovie.save();
          }

          setProcessedCount(currentCount + countInCurrentBatch);
          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: { title: movieInfo.movieName, success: !!addedMovie, retryCount: retryCount },
          });
        } catch (error) {
          Logger.error(`Error processing movie: ${movieInfo.movieName}`);
          Logger.info(`Retry count for movie: ${movieInfo.movieId} is ${retryCount}`);

          setProcessedCount(currentCount + countInCurrentBatch);
          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: { title: movieInfo.movieName, success: false, retryCount: retryCount },
          });

          if (retryCount == RETRY_ATTEMPTS - 1) {
            await Movie.findByIdAndUpdate(movieInfo.movieId, { $set: { failedDuringScrape: true } }, { new: true });
          }
          retryCount++;
        }
      }
    }
  } catch (error) {
    Logger.error(`error in browser: ${JSON.stringify(error)}`);

    if (error.name === "ProtocolError" || error.name === "TargetCloseError") {
      Logger.warn(`${error.name}, relaunching browser...`);
      await initBrowser();
      pageInstanceForMultiple = await browser.newPage();
    }
  } finally {
    let processed = countInCurrentBatch + currentCount;
    if (processed >= totalCount || BATCH_SIZE * batchCount >= totalCount) {
      await closeBrowser();
    }
  }
}

async function searchAndScrapeMovie(page, movieName, movieYear) {
  try {
    const isInputFilled = await page.$eval('input[data-testid="search-input"]', (input) => input.value.trim() !== "");

    if (isInputFilled) {
      await page.$eval('input[data-testid="search-input"]', (input) => (input.value = ""));
    }

    for (let retries = 0; retries < 3; retries++) {
      try {
        await page.type('input[data-testid="search-input"]', `${movieName} ${movieYear}`);
        await new Promise((r) => setTimeout(r, 1500));

        const actualValue = await page.$eval('input[data-testid="search-input"]', (input) => input.value.trim());
        if (actualValue !== "") {
          break;
        } else {
          await new Promise((r) => setTimeout(r, 2000));
        }
      } catch (error) {
        Logger.error(`Error typing search term: ${error}`);
      }
    }

    const actualValue = await page.$eval('input[data-testid="search-input"]', (input) => input.value.trim());
    if (actualValue === "") {
      throw { message: "Input field is empty after retries" };
    }

    await page.waitForSelector("#search_dropdown_results", { timeout: 60 * 1000 * 2 });
    await page.waitForSelector("#search_dropdown_results a", { timeout: 60 * 1000 * 2 });

    const resultLinks = await page.$$eval("#search_dropdown_results a", (links) =>
      links.map((link) => ({
        title: link.getAttribute("title"),
        href: link.getAttribute("href"),
        titleWithYear: link.querySelector(".css-bddqzz.e121vwr03").textContent.trim(),
      }))
    );

    const matchingResult = resultLinks.find((link) => {
      const title = link.title.toLowerCase();
      const titleWithYear = link.titleWithYear.toLowerCase();
      const sanitizedTitle = title.replace(/[^\w\s]/gi, "");
      const sanitizedMovieName = movieName.replace(/[^\w\s]/gi, "").toLowerCase();
      const allWordsIncluded = sanitizedMovieName.split(" ").every((word) => sanitizedTitle.includes(word));
      const matchesYear = link.href.includes(movieYear) || titleWithYear.includes(`(${movieYear.trim()})`);

      return allWordsIncluded && matchesYear;
    });

    if (!matchingResult) {
      throw { message: "No matching result found." };
    }

    await Promise.all([
      page.waitForNavigation({ waitUntil: ["domcontentloaded", "load", "networkidle2"], timeout: 60 * 1000 * 2 }),
      page.goto(`${SEARCH_PAGE_URL}${matchingResult.href}`),
    ]);

    await checkPageIsReady(page);
    await page.waitForSelector(".css-hiz1q1.e3s42hj0", { timeout: 60 * 1000 * 2 });

    const movieDetails = await scrapeMovieDetails({ _page: page });

    return movieDetails;
  } catch (error) {
    Logger.error(`Error searching and scraping movie: ${error}`);
    throw error;
  }
}

module.exports = {
  scrapeMovieDetails,
  searchAndScrapeMovies,
};
