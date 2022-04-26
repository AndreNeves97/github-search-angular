import { TestBed } from '@angular/core/testing';

import { SearchRepositoryService } from './search-repository.service';

describe('SearchRepositoryService', () => {
  let service: SearchRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
