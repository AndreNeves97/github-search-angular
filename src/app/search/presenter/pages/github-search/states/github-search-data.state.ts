import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';

export class GithubSearchDataState {
  hasError: boolean;
  isLoading: boolean;
  data!: GithubSearchResult[] | null;

  constructor(
    hasError: boolean,
    isLoading: boolean,
    data: GithubSearchResult[]
  ) {
    this.hasError = hasError;
    this.isLoading = isLoading;
    this.data = data;
  }

  public static loading(
    data: GithubSearchResult[] | null = null
  ): GithubSearchDataState {
    return {
      hasError: false,
      isLoading: true,
      data,
    };
  }

  public static error(
    data: GithubSearchResult[] | null = null
  ): GithubSearchDataState {
    return {
      hasError: true,
      isLoading: false,
      data,
    };
  }

  public static success(data: GithubSearchResult[]): GithubSearchDataState {
    return {
      hasError: false,
      isLoading: false,
      data,
    };
  }
}
