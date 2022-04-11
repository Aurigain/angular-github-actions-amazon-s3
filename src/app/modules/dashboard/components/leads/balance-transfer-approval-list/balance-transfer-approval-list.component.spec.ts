import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferApprovalListComponent } from './balance-transfer-approval-list.component';

describe('BalanceTransferApprovalListComponent', () => {
  let component: BalanceTransferApprovalListComponent;
  let fixture: ComponentFixture<BalanceTransferApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTransferApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
