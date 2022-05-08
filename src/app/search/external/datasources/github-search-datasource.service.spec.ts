import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/external/api/api.service';
import { GithubSearchRequest } from '../../domain/entities/github-search-request';
import { GithubSearchResult } from '../../domain/entities/github-search-result';

import { GithubSearchDatasourceService } from './github-search-datasource.service';

describe('GithubSearchDatasourceService', () => {
  let service: GithubSearchDatasourceService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        GithubSearchDatasourceService,
        {
          provide: ApiService,
          useValue: spy,
        },
      ],
    });

    service = TestBed.inject(GithubSearchDatasourceService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchSearchResults should return empty results when query is empty', (done: DoneFn) => {
    const searchRequest: GithubSearchRequest = {
      query: '',
      page: 1,
      perPage: 9,
    };

    const returnValue: GithubSearchResult = GithubSearchResult.empty();

    service.fetchSearchResults(searchRequest).subscribe((result) => {
      expect(result)
        .withContext('service return empty result')
        .toEqual(returnValue);

      done();
    });
  });

  it('#fetchSearchResults should return results from API when query is not empty', (done: DoneFn) => {
    const searchRequest: GithubSearchRequest = {
      query: 'AndreNeves97',
      page: 1,
      perPage: 9,
    };

    const returnValueFromApi = {
      items: [
        {
          avatarUrl: 'https://avatars.githubusercontent.com/u/16177771?v=4',
          login: 'AndreNeves97',
          type: 'User',
        },
      ],
      total_count: 1,
    };

    const returnValueFromService: GithubSearchResult = new GithubSearchResult(
      returnValueFromApi.items,
      returnValueFromApi.total_count
    );

    const stubValue = of(returnValueFromApi);
    apiServiceSpy.get.and.returnValue(stubValue);

    service.fetchSearchResults(searchRequest).subscribe((result) => {
      expect(result)
        .withContext('service return empty result')
        .toEqual(returnValueFromService);

      done();
    });
  });
});
