import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorStepAgentListComponent } from './door-step-agent-list.component';

describe('DoorStepAgentListComponent', () => {
  let component: DoorStepAgentListComponent;
  let fixture: ComponentFixture<DoorStepAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoorStepAgentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorStepAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
