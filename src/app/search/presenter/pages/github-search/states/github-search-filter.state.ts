export class GithubSearchFilterState {
  searchTerm: string | null;

  constructor(searchTerm: string | null) {
    this.searchTerm = searchTerm;
  }

  static default(): GithubSearchFilterState {
    return new GithubSearchFilterState('');
  }
}
