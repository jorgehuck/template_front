import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesEmailsModalComponent } from './templates-emails-modal.component';

describe('EmailModalComponent', () => {
  let component: TemplatesEmailsModalComponent;
  let fixture: ComponentFixture<TemplatesEmailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatesEmailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesEmailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
