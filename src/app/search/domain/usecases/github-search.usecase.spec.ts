import { TestBed } from '@angular/core/testing';

import { GithubSearchUsecase } from './github-search.usecase';

describe('GithubSearchUsecase', () => {
  let usecase: GithubSearchUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usecase = TestBed.inject(GithubSearchUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
