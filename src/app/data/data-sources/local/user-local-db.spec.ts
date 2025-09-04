import { TestBed } from '@angular/core/testing';

import { UserLocalDbService } from './user-local-db';

describe('UserLocalDb', () => {
  let service: UserLocalDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLocalDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
