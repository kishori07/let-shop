import { TestBed } from '@angular/core/testing';

import { AdminUseOnlyService } from './admin-use-only.service';

describe('AdminUseOnlyService', () => {
  let service: AdminUseOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUseOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
