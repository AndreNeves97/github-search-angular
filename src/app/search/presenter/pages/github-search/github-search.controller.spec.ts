import { TestBed } from '@angular/core/testing';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';

import { GithubSearchController } from './github-search.controller';

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

  it('should be created', () => {
    expect(controller).toBeTruthy();
  });
});
