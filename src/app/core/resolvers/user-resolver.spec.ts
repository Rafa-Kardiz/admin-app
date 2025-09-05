import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userResolver } from './user-resolver';
import { Usermodel } from '@models/usermodel';

describe('userResolverResolver', () => {
  const executeResolver: ResolveFn<Usermodel | null> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => userResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
