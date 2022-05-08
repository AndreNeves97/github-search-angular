import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: spy,
        },
      ],
    });

    service = TestBed.inject(ApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#get should call httpClient.get method', (done: DoneFn) => {
    const returnValue = { someValue: '' };
    const stubValue = of(returnValue);
    httpClientSpy.get.and.returnValue(stubValue);

    service.get('', {}).subscribe((result) => {
      expect(result)
        .withContext('service return the value provided by httpClient.get()')
        .toEqual(returnValue);

      done();
    });
  });
});
