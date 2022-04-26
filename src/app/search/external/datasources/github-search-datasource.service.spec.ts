import { TestBed } from '@angular/core/testing';

import { GithubSearchDatasourceService } from './github-search-datasource.service';

describe('GithubSearchDatasourceService', () => {
  let service: GithubSearchDatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubSearchDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
