import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalApprovalListComponent } from './final-approval-list.component';

describe('FinalApprovalListComponent', () => {
  let component: FinalApprovalListComponent;
  let fixture: ComponentFixture<FinalApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
