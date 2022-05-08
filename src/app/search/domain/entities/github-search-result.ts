import { GithubUser } from './github-user';

export class GithubSearchResult {
  items: GithubUser[];
  totalCount: number;

  constructor(items: GithubUser[], totalCount: number) {
    this.items = items;
    this.totalCount = totalCount;
  }

  public static fromList(items: GithubUser[]) {
    return new GithubSearchResult(items, items.length);
  }

  public static empty(): GithubSearchResult {
    return GithubSearchResult.fromList([]);
  }
}
