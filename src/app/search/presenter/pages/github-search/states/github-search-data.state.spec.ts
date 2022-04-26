import { GithubSearchDataState } from './github-search-data.state';

describe('GithubSearchDataState', () => {
  it('should create an instance', () => {
    expect(GithubSearchDataState.loading()).toBeTruthy();
  });
});
