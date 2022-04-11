import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferFinalApprovalComponent } from './balance-transfer-final-approval.component';

describe('BalanceTransferFinalApprovalComponent', () => {
  let component: BalanceTransferFinalApprovalComponent;
  let fixture: ComponentFixture<BalanceTransferFinalApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTransferFinalApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferFinalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
