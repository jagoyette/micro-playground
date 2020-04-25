import { TestBed } from '@angular/core/testing';

import { PatientMediaService } from './patient-media.service';

describe('PatientMediaService', () => {
  let service: PatientMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
