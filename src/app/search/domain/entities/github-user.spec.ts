import { GithubUser } from './github-user';

describe('GithubUser', () => {
  it('should create an instance', () => {
    expect(new GithubUser('', '', '')).toBeTruthy();
  });
});
