const { searchAndScrapeMovies } = require("./functions");
const { extractMovieInfoFromCdnUrl } = require("./helpers");

const puppeteer = require("puppeteer");

const Logger = require("../../lib/logger");

const { Movie } = require("../../models");

const BATCH_SIZE = 2;
let isScraping = false; // Variable to track if scraping is in progress
let totalCount = 0;
let processedCount = 0;
let stopProcess = false;
let callback; // callback functions from child function

let GLOBAL_BROWSER = undefined;

const NODE_ENV = process.env.NODE_ENV;

const setProcessedCount = (count) => {
  processedCount = count;
};

const setCallBack = (_callback) => {
  callback = _callback;
};

async function initBrowser() {
  try {
    if (GLOBAL_BROWSER) {
      return GLOBAL_BROWSER;
    }

    return await puppeteer.launch({
      headless: NODE_ENV == "production" ? "new" : false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 3 * 60 * 1000,
      protocolTimeout: 5 * 60 * 1000,
    });
  } catch (error) {
    Logger.error(`Error while initializing browser : ${error}`);
    throw error;
  }
}

/**
 * @param {puppeteer.Browser} browser - A Puppeteer browser
 */
async function closeBrowser(browser) {
  try {
    console.log("browser close called");
    if (browser) {
      const pages = await browser.pages();
      console.log("pages ", pages);

      // const promises = pages.map((page) =>
      //   page.waitForNetworkIdle({ idleTime: 1000 * 2, timeout: 0 })
      // );
      // await Promise.all(promises);
      for (const page of pages) {
        await page.close({ runBeforeUnload: true });
      }
      console.log("pages closed");
      await browser.close();
      console.log("browser closed");

      GLOBAL_BROWSER = undefined;
    }
  } catch (error) {
    Logger.error(`Error while closing browser : ${error}`);
    throw error;
  }
}

//CREATE
const scrapeAllMovies = async (io, req, res) => {
  let browser;
  try {
    const type = req.body.type;

    // Check if scraping process is already running
    if (isScraping) {
      return res
        .status(400)
        .json({ message: "A scraping process is currently running" });
    }

    // Lock the API
    isScraping = true;

    //default
    let query = {};

    if (NODE_ENV !== "production") {
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
          { failedDuringScrape: { $ne: true } }, // Exclude documents where failedDuringScrape is true
        ],
      };
    }

    if (type == "failed_movies") {
      query = {
        failedDuringScrape: true,
      };
    }

    // Get the total count of movies that match the filter
    totalCount = await Movie.countDocuments(query);

    let page = 1;
    let totalPages = Math.ceil(totalCount / BATCH_SIZE);
    let localProcessedCount = 0;
    let batchCount = 1;

    // Emit details and progress at start
    io.emit("scrapeDetails", {
      total: totalCount,
      processed: processedCount,
    });

    //Init browser
    browser = await initBrowser();
    GLOBAL_BROWSER = browser;

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
        } else {
          await Movie.findByIdAndUpdate(
            movie?._id,
            {
              $set: {
                failedDuringScrape: true,
              },
            },
            { new: true }
          );

          Logger.error(
            `Movie ( ${movie?.title} / ${movie?._id} ) name & year could not be extracted`
          );
        }
        //immediately adds BATCH_SIZE
        localProcessedCount++;
      }

      let currentCount = localProcessedCount - BATCH_SIZE;

      await searchAndScrapeMovies({
        movieInfos,
        io,
        totalCount,
        //remove batch size to ensure count is accurate
        currentCount,
        batchCount,
        setProcessedCount,
        stopProcess,
        setCallBack,
        browser,
      });

      // stop in outer while loop if inner has stopped
      if (stopProcess) {
        Logger.error("[controller.js] Scraping process stopped remotely.");
        stopProcess = false; // Reset stopProcess
        break; // Exit the outer loop immediately
      }

      page++;

      //temp
      // await closeBrowser(browser);

      Logger.info(`Batch ${batchCount} complete -----`);
      batchCount++;
    }

    // Close the browser after processing the whole movies
    await closeBrowser(browser);

    // Unlock the API after scraping is complete
    isScraping = false;

    processedCount = 0;

    res.status(200).json({
      success: true,
      message: `${totalCount} scraped and imported`,
    });
  } catch (err) {
    console.log("error ", err);

    isScraping = false;

    if (browser) {
      await closeBrowser(browser);
    }

    res.status(500).json(err);
  }
};

const stopScraping = (io, req, res) => {
  if (!isScraping) {
    res.status(400).send({
      message: "No current scraping process",
    });
    return;
  }

  io.emit("scrapeDetails", {
    total: totalCount,
    processed: processedCount,
  });

  stopProcess = true;
  res.status(200).json({
    success: true,
    message: `Scraping stop sent!\nWill stop after current batch.`,
  });
};

const checkScrapingProgress = (io, req, res) => {
  if (!isScraping) {
    res.status(400).send({
      message: "No current scraping process",
    });
    return;
  }

  io.emit("scrapeDetails", {
    total: totalCount,
    processed: processedCount,
  });
  res.status(200).json({
    message: "Scraping progress emitted",
    total: totalCount,
    processed: processedCount,
  });
};

module.exports = {
  scrapeAllMovies,
  stopScraping,
  checkScrapingProgress,
};
