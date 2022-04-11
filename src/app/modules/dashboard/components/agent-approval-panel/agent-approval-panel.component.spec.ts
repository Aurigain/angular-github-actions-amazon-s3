import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentApprovalPanelComponent } from './agent-approval-panel.component';

describe('AgentApprovalPanelComponent', () => {
  let component: AgentApprovalPanelComponent;
  let fixture: ComponentFixture<AgentApprovalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentApprovalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentApprovalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
