import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticatGuardGuard } from './authenticat-guard-guard';

describe('authenticatGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      authenticatGuardGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
