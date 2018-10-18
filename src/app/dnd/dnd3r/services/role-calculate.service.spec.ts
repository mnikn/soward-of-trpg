import { TestBed } from '@angular/core/testing';

import { RoleCalculateService } from './role-calculate.service';

describe('RoleCalculateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleCalculateService = TestBed.get(RoleCalculateService);
    expect(service).toBeTruthy();
  });
});
