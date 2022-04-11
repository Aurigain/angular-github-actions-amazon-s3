import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferLeadsComponent } from './balance-transfer-leads.component';

describe('BalanceTransferLeadsComponent', () => {
  let component: BalanceTransferLeadsComponent;
  let fixture: ComponentFixture<BalanceTransferLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTransferLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
