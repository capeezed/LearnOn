import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profGuardTsGuard } from './prof-guard.ts-guard';

describe('profGuardTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profGuardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
