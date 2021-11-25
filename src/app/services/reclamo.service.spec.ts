import { TestBed } from '@angular/core/testing';

import { ReclamoService } from './reclamo.service';

describe('ReclamoService', () => {
  let service: ReclamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
