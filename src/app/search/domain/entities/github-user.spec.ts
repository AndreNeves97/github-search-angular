import { GithubUser } from './github-user';

describe('GithubUser', () => {
  const avatarUrl = 'https://avatars.githubusercontent.com/u/16177771?v=4';
  const login = 'AndreNeves97';
  const type = 'User';

  let instance: GithubUser;

  beforeEach(() => {
    instance = new GithubUser(avatarUrl, login, type);
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });

  it('should create a instance with custom constructor params', () => {
    expect(instance).toEqual(
      jasmine.objectContaining({
        avatarUrl,
        login,
        type,
      })
    );
  });
});
