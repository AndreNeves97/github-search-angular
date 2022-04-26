export class GithubSearchViewState {
  page: number;

  constructor(page: number) {
    this.page = page;
  }

  public static default(): GithubSearchViewState {
    return {
      page: 1,
    };
  }
}
