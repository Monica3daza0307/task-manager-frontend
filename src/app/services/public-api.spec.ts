import { TestBed } from '@angular/core/testing';

import { PublicApi } from './public-api';

describe('PublicApi', () => {
  let service: PublicApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
