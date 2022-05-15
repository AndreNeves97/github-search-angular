import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';

export class GithubSearchDataState {
  hasError: boolean;
  isLoading: boolean;
  data!: GithubSearchResult;

  constructor(hasError: boolean, isLoading: boolean, data: GithubSearchResult) {
    this.hasError = hasError;
    this.isLoading = isLoading;
    this.data = data;
  }

  public static loading(data: GithubSearchResult): GithubSearchDataState {
    return {
      hasError: false,
      isLoading: true,
      data,
    };
  }

  public static error(data: GithubSearchResult): GithubSearchDataState {
    return {
      hasError: true,
      isLoading: false,
      data,
    };
  }

  public static success(data: GithubSearchResult): GithubSearchDataState {
    return {
      hasError: false,
      isLoading: false,
      data,
    };
  }

  public static empty(): GithubSearchDataState {
    const data = GithubSearchResult.empty();
    return GithubSearchDataState.success(data);
  }
}
