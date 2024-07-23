import { TestBed } from '@angular/core/testing';

import { ServiceInProgressService } from './service-in-progress.service';

describe('ServiceInProgressService', () => {
  let service: ServiceInProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceInProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
