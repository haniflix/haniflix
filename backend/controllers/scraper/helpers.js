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

    // Define the regular expression patterns
    const patterns = [
      /([^/]+)\s*\((\d{4})\)\s*(?:\[|\s)([^/]+)/, // existing pattern
      /([^/]+)\s*\((\d{4})\)(?:\s*-\s*(?:\[(\d+p)\]))?\//, // fallback pattern
    ];

    // Try each pattern until a match is found
    for (const pattern of patterns) {
      const match = pattern.exec(decodedString);
      if (match) {
        // Extract movie name, year, and quality from the matched groups
        const movieName = match[1].replace(/%20/g, " ");
        const movieYear = match[2];
        const movieQuality = match[3] || "Unknown";

        return { movieName, movieYear, movieQuality, movieId };
      }
    }
  }

  return null;
}

module.exports = {
  extractMovieInfoFromCdnUrl,
};
