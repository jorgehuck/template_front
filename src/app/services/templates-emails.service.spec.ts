import { TestBed } from '@angular/core/testing';

import { TemplatesEmailsService } from './templates-emails.service';

describe('TemplatesService', () => {
  let service: TemplatesEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
