import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GithubSearchRequest } from '../../domain/entities/github-search-request';
import { GithubSearchResult } from '../../domain/entities/github-search-result';
import { GithubSearchDatasource } from '../datasources/github-search-datasource.interface';

import { SearchRepositoryService } from './search-repository.service';

describe('SearchRepositoryService', () => {
  let service: SearchRepositoryService;
  let githubSearchDatasourceSpy: jasmine.SpyObj<GithubSearchDatasource>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GithubSearchDatasource', [
      'fetchSearchResults',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SearchRepositoryService,
        {
          provide: GithubSearchDatasource,
          useValue: spy,
        },
      ],
    });

    service = TestBed.inject(SearchRepositoryService);

    githubSearchDatasourceSpy = TestBed.inject(
      GithubSearchDatasource
    ) as jasmine.SpyObj<GithubSearchDatasource>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#searchOnGithub should request search results from #GithubSearchDatasource (empty query)', (done: DoneFn) => {
    const searchRequest: GithubSearchRequest = {
      query: '',
      page: 1,
      perPage: 9,
    };

    const returnValue: GithubSearchResult = GithubSearchResult.empty();

    const stubValue = of(returnValue);
    githubSearchDatasourceSpy.fetchSearchResults.and.returnValue(stubValue);

    service.searchOnGithub(searchRequest).subscribe((result) => {
      expect(result).toEqual(returnValue);
      done();
    });
  });

  it('#call should request search results from #SearchRepository (not empty query)', (done: DoneFn) => {
    const searchRequest: GithubSearchRequest = {
      query: 'AndreNeves97',
      page: 1,
      perPage: 9,
    };

    const returnValue: GithubSearchResult = GithubSearchResult.fromList([
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/16177771?v=4',
        htmlUrl: 'https://github.com/AndreNeves97',
        login: 'AndreNeves97',
        type: 'User',
      },
    ]);

    const stubValue = of(returnValue);
    githubSearchDatasourceSpy.fetchSearchResults.and.returnValue(stubValue);

    service.searchOnGithub(searchRequest).subscribe((result) => {
      expect(result)
        .withContext('service returned stub value')
        .toEqual(returnValue);

      done();
    });
  });
});
