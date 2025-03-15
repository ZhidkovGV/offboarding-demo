import { TestBed } from '@angular/core/testing';

import { OffboardingProcessService } from './offboarding-process.service';

describe('OffboardingProcessService', () => {
  let service: OffboardingProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffboardingProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
