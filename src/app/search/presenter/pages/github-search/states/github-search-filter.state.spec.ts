import { GithubSearchFilterState } from './github-search-filter.state';

describe('GithubSearchFilterState', () => {
  it('should create an instance', () => {
    expect(GithubSearchFilterState.default()).toBeTruthy();
  });

  it('should create a instance with custom searchTerm', () => {
    const searchTerm = 'my custom search';
    const state = new GithubSearchFilterState(searchTerm);

    expect(state).toEqual(
      jasmine.objectContaining({
        searchTerm,
      })
    );
  });

  it('should create a default instance with empty searchTerm', () => {
    const state = GithubSearchFilterState.default();

    expect(state).toEqual(
      jasmine.objectContaining({
        searchTerm: '',
      })
    );
  });
});
