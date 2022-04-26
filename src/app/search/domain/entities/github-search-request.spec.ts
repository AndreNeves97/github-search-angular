import { GithubSearchRequest } from './github-search-request';

describe('GithubSearchRequest', () => {
  it('should create an instance', () => {
    expect(new GithubSearchRequest('', 1)).toBeTruthy();
  });
});
