import { TestBed } from '@angular/core/testing';

import { CitynameService } from './cityname.service';

describe('CitynameService', () => {
  let service: CitynameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitynameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
