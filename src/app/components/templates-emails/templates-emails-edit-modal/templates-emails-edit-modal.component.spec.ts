import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditModalComponent } from './email-edit-modal.component';

describe('EmailModalComponent', () => {
  let component: EmailEditModalComponent;
  let fixture: ComponentFixture<EmailEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
