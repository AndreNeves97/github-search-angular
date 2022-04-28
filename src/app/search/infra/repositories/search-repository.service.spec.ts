import { TestBed } from '@angular/core/testing';
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
});
