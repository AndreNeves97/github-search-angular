import { GithubSearchResult } from './github-search-result';
import { GithubUser } from './github-user';

describe('GithubSearchResult', () => {
  const defaultItems: GithubUser[] = [];
  const defaultTotalCount = 0;

  let instance: GithubSearchResult;

  beforeEach(() => {
    instance = new GithubSearchResult(defaultItems, defaultTotalCount);
  });

  it('should create an instance', () => {
    expect(GithubSearchResult.empty()).toBeTruthy();
  });

  it('should create a instance with custom constructor params', () => {
    expect(instance).toEqual(
      jasmine.objectContaining({
        items: defaultItems,
        totalCount: defaultTotalCount,
      })
    );
  });
});
