import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferFinalApprovalDetailComponent } from './balance-transfer-final-approval-detail.component';

describe('BalanceTransferFinalApprovalDetailComponent', () => {
  let component: BalanceTransferFinalApprovalDetailComponent;
  let fixture: ComponentFixture<BalanceTransferFinalApprovalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTransferFinalApprovalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferFinalApprovalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
