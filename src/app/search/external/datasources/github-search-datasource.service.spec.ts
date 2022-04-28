import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/core/external/api/api.service';

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
});
