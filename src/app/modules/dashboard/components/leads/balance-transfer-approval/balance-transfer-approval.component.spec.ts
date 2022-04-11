import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferApprovalComponent } from './balance-transfer-approval.component';

describe('BalanceTransferApprovalComponent', () => {
  let component: BalanceTransferApprovalComponent;
  let fixture: ComponentFixture<BalanceTransferApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTransferApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
