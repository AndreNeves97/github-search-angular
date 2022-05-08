import { GithubSearchRequest } from './github-search-request';

describe('GithubSearchRequest', () => {
  const defaultQuery = 'my custom query term';
  const defaultPage = 10;
  const defaultPerPage = 9;

  let instance: GithubSearchRequest;

  beforeEach(() => {
    instance = new GithubSearchRequest(
      defaultQuery,
      defaultPage,
      defaultPerPage
    );
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });

  it('should create a instance with custom constructor params', () => {
    expect(instance).toEqual(
      jasmine.objectContaining({
        query: defaultQuery,
        page: defaultPage,
        perPage: defaultPerPage,
      })
    );
  });
});
