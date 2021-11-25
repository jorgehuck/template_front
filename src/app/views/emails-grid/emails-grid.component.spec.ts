import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsGridComponent } from './emails-grid.component';

describe('EmailsGridComponent', () => {
  let component: EmailsGridComponent;
  let fixture: ComponentFixture<EmailsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
