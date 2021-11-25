import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosModalComponent } from './reclamos-modal.component';

describe('ReclamosModalComponent', () => {
  let component: ReclamosModalComponent;
  let fixture: ComponentFixture<ReclamosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamosModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
