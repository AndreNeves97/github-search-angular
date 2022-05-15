import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';
import { GithubSearchDataState } from './github-search-data.state';

describe('GithubSearchDataState', () => {
  it('should create an instance', () => {
    const state = new GithubSearchDataState(
      false,
      false,
      GithubSearchResult.empty()
    );
    expect(state).toBeTruthy();
  });

  it('should create an loading state instance', () => {
    const state = GithubSearchDataState.loading(GithubSearchResult.empty());

    expect(state).toEqual(
      jasmine.objectContaining({
        isLoading: true,
      })
    );
  });

  it('should create an error state instance', () => {
    const state = GithubSearchDataState.error(GithubSearchResult.empty());

    expect(state).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        hasError: true,
      })
    );
  });

  it('should create an success state instance', () => {
    const state = GithubSearchDataState.empty();

    expect(state).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        hasError: false,
        data: GithubSearchResult.empty(),
      })
    );
  });
});
