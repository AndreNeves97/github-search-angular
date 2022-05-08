import { GithubSearchViewState } from './github-search-view.state';

describe('GithubSearchViewState', () => {
  it('should create an instance', () => {
    expect(GithubSearchViewState.default()).toBeTruthy();
  });

  it('should create a instance with custom page', () => {
    const page = 10;
    const state = new GithubSearchViewState(page);

    expect(state).toEqual(
      jasmine.objectContaining({
        page,
      })
    );
  });

  it('should create a default instance that shows first page', () => {
    const state = GithubSearchViewState.default();

    expect(state).toEqual(
      jasmine.objectContaining({
        page: 1,
      })
    );
  });
});
