import { GithubSearchResult } from './github-search-result';

describe('GithubSearchResult', () => {
  it('should create an instance', () => {
    expect(new GithubSearchResult('', '', '')).toBeTruthy();
  });
});
