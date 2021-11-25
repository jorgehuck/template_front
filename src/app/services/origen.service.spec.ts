import { TestBed } from '@angular/core/testing';

import { OrigenService } from './origen.service';

describe('OrigenService', () => {
  let service: OrigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
