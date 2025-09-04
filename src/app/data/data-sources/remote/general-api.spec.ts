import { TestBed } from '@angular/core/testing';

import { GeneralApi } from './general-api';

describe('GeneralApi', () => {
  let service: GeneralApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
