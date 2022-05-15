import { TestBed } from '@angular/core/testing';

import { AppController } from './app.controller';

describe('AppController', () => {
  let service: AppController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
