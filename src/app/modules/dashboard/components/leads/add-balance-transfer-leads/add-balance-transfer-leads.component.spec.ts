import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBalanceTransferLeadsComponent } from './add-balance-transfer-leads.component';

describe('AddBalanceTransferLeadsComponent', () => {
  let component: AddBalanceTransferLeadsComponent;
  let fixture: ComponentFixture<AddBalanceTransferLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBalanceTransferLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBalanceTransferLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
