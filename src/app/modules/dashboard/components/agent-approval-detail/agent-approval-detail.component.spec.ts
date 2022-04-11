import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentApprovalDetailComponent } from './agent-approval-detail.component';

describe('AgentApprovalDetailComponent', () => {
  let component: AgentApprovalDetailComponent;
  let fixture: ComponentFixture<AgentApprovalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentApprovalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentApprovalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
