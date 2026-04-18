import { PinnedRepo } from '../types/github';

const PINNED_REPOS_ENDPOINT = 'https://gh-pinned-repos.egoist.dev';

export const githubService = {
  async getPinnedRepos(username: string): Promise<PinnedRepo[]> {
    const response = await fetch(`${PINNED_REPOS_ENDPOINT}/?username=${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pinned repos: ${response.status}`);
    }
    return response.json();
  },
};
