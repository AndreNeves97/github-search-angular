import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, tap } from 'rxjs';
import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';

import { GithubSearchController } from './github-search.controller';
import { GithubSearchFilterState } from './states/github-search-filter.state';

describe('GithubSearchController', () => {
  let controller: GithubSearchController;
  let githubSearchUsecaseSpy: jasmine.SpyObj<GithubSearchUsecase>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GithubSearchUsecase', ['call']);

    TestBed.configureTestingModule({
      providers: [
        GithubSearchController,
        {
          provide: GithubSearchUsecase,
          useValue: spy,
        },
      ],
    });

    controller = TestBed.inject(GithubSearchController);

    githubSearchUsecaseSpy = TestBed.inject(
      GithubSearchUsecase
    ) as jasmine.SpyObj<GithubSearchUsecase>;
  });

  beforeEach(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.empty();
    const stubValue = of(returnValue);
    githubSearchUsecaseSpy.call.and.returnValue(stubValue);
  });

  it('should be created', () => {
    expect(controller).toBeTruthy();
  });

  it('#setSearchTerm should update the filter state', () => {
    const defaultFilterState = GithubSearchFilterState.default();

    expect(controller.filterState$.value.searchTerm)
      .withContext('searchTerm in filterState should have default value')
      .toEqual(defaultFilterState.searchTerm);

    const newSearchTerm = 'andre neves';
    controller.setSearchTerm(newSearchTerm);

    expect(controller.filterState$.value.searchTerm)
      .withContext('searchTerm in filterState should have the new value')
      .toEqual(newSearchTerm);
  });

  it('should set hasError property in dataState when dataSource throws an error', fakeAsync(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.empty();

    const stubValue = of(returnValue).pipe(
      tap(() => {
        throw new Error('');
      })
    );

    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    expect(controller.dataState$.value)
      .withContext('initial dataState should not have error')
      .toEqual(
        jasmine.objectContaining({
          hasError: false,
        })
      );

    controller.setSearchTerm('andre neves');
    tick(3000);

    expect(controller.dataState$.value)
      .withContext('new dataState should have error')
      .toEqual(
        jasmine.objectContaining({
          hasError: true,
        })
      );
  }));
});
