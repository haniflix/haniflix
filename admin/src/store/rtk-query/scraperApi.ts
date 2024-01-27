import { ScraperPostBody } from '../types';
import { authApi } from './authApi';

export const scraperApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    scrapeWebsite: builder.mutation({
      query: (data: Partial<ScraperPostBody>) => ({
        url: 'scraper/scrape',
        method: 'POST',
        body: data
      })
    })
  }),
  overrideExisting: false
});

export const { useScrapeWebsiteMutation } = scraperApi;
