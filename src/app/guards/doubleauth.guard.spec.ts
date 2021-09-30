import { TestBed } from '@angular/core/testing';

import { DoubleauthGuard } from './doubleauth.guard';

describe('DoubleauthGuard', () => {
  let guard: DoubleauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoubleauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
