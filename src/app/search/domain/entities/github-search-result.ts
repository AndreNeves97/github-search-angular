import { GithubUser } from './github-user';

export class GithubSearchResult {
  items: GithubUser[];
  totalCount: number;

  constructor(items: GithubUser[], totalCount: number) {
    this.items = items;
    this.totalCount = totalCount;
  }

  public static fromApiResponse(response: any): GithubSearchResult {
    const items = response.items.map(
      (item: any) =>
        new GithubUser(item.avatar_url, item.html_url, item.login, item.type)
    );

    return new GithubSearchResult(items, response.total_count);
  }

  public static fromList(items: GithubUser[]): GithubSearchResult {
    return new GithubSearchResult(items, items.length);
  }

  public static empty(): GithubSearchResult {
    return GithubSearchResult.fromList([]);
  }
}
