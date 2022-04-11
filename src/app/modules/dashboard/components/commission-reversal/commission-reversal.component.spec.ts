import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionReversalComponent } from './commission-reversal.component';

describe('CommissionReversalComponent', () => {
  let component: CommissionReversalComponent;
  let fixture: ComponentFixture<CommissionReversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionReversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
