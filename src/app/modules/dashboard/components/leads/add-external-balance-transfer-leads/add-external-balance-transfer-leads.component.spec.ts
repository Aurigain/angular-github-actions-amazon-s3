import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExternalBalanceTransferLeadsComponent } from './add-external-balance-transfer-leads.component';

describe('AddExternalBalanceTransferLeadsComponent', () => {
  let component: AddExternalBalanceTransferLeadsComponent;
  let fixture: ComponentFixture<AddExternalBalanceTransferLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExternalBalanceTransferLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExternalBalanceTransferLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
