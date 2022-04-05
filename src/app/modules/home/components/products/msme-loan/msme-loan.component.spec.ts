import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmeLoanComponent } from './msme-loan.component';

describe('MsmeLoanComponent', () => {
  let component: MsmeLoanComponent;
  let fixture: ComponentFixture<MsmeLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsmeLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsmeLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
