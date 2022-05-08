import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { GithubSearchDatasourceService } from '../../external/datasources/github-search-datasource.service';
import { GithubSearchDatasource } from '../../infra/datasources/github-search-datasource.interface';
import { SearchRepositoryService } from '../../infra/repositories/search-repository.service';
import { SearchModule } from '../../search.module';
import { GithubSearchRequest } from '../entities/github-search-request';
import { GithubSearchResult } from '../entities/github-search-result';
import { SearchRepository } from '../repositories/search-repository.interface';

import { GithubSearchUsecase } from './github-search.usecase';

describe('GithubSearchUsecase', () => {
  let usecase: GithubSearchUsecase;
  let searchRepositorySpy: jasmine.SpyObj<SearchRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SearchRepository', ['searchOnGithub']);

    TestBed.configureTestingModule({
      providers: [
        GithubSearchUsecase,
        {
          provide: SearchRepository,
          useValue: spy,
        },
      ],
    });

    usecase = TestBed.inject(GithubSearchUsecase);

    searchRepositorySpy = TestBed.inject(
      SearchRepository
    ) as jasmine.SpyObj<SearchRepository>;
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });

  it('#searchOnGithub should request search results from #SearchRepository (empty query)', (done: DoneFn) => {
    const searchRequest: GithubSearchRequest = {
      query: '',
      page: 1,
      perPage: 9,
    };

    const returnValue: GithubSearchResult = GithubSearchResult.empty();

    const stubValue = of(returnValue);
    searchRepositorySpy.searchOnGithub.and.returnValue(stubValue);

    usecase.call(searchRequest).subscribe((result) => {
      expect(result).toEqual(returnValue);
      done();
    });
  });

  it('#searchOnGithub should request search results from #SearchRepository (not empty query)', (done: DoneFn) => {
    const searchRequest: GithubSearchRequest = {
      query: 'AndreNeves97',
      page: 1,
      perPage: 9,
    };

    const returnValue: GithubSearchResult = GithubSearchResult.fromList([
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/16177771?v=4',
        login: 'AndreNeves97',
        type: 'User',
      },
    ]);

    const stubValue = of(returnValue);
    searchRepositorySpy.searchOnGithub.and.returnValue(stubValue);

    usecase.call(searchRequest).subscribe((result) => {
      expect(result)
        .withContext('service returned stub value')
        .toEqual(returnValue);
      done();
    });
  });
});
