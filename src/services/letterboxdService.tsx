import { RecentWatch } from '../types/letterboxd';

const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json';

export const letterboxdService = {
  async getRecentWatches(username: string): Promise<RecentWatch[]> {
    const rssUrl = `https://letterboxd.com/${username}/rss/`;
    const response = await fetch(`${RSS2JSON_ENDPOINT}?rss_url=${encodeURIComponent(rssUrl)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Letterboxd feed: ${response.status}`);
    }
    const data = await response.json();
    if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

    return data.items
      .filter((item: { link?: string }) => item.link?.includes('/film/'))
      .map(parseItem);
  },
};

function parseItem(item: { title?: string; link?: string; pubDate?: string; description?: string }): RecentWatch {
  const title = item.title || '';
  const separatorIdx = title.lastIndexOf(' - ');
  const filmTitle = separatorIdx >= 0 ? title.slice(0, separatorIdx) : title;
  const rating = separatorIdx >= 0 ? title.slice(separatorIdx + 3) : '';
  const posterMatch = typeof item.description === 'string'
    ? item.description.match(/<img[^>]+src="([^"]+)"/)
    : null;
  return {
    title,
    filmTitle,
    rating,
    link: item.link || '',
    pubDate: item.pubDate || '',
    poster: posterMatch ? posterMatch[1] : null,
  };
}
