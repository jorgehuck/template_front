import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosGridComponent } from './reclamos-grid.component';

describe('ReclamosGridComponent', () => {
  let component: ReclamosGridComponent;
  let fixture: ComponentFixture<ReclamosGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamosGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
