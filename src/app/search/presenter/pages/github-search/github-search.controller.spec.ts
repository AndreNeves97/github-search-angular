import { TestBed } from '@angular/core/testing';

import { GithubSearchController } from './github-search.controller';

describe('GithubSearchController', () => {
  let controller: GithubSearchController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    controller = TestBed.inject(GithubSearchController);
  });

  it('should be created', () => {
    expect(controller).toBeTruthy();
  });
});
