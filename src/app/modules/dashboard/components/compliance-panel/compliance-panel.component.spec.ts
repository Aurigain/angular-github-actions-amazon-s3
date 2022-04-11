import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancePanelComponent } from './compliance-panel.component';

describe('CompliancePanelComponent', () => {
  let component: CompliancePanelComponent;
  let fixture: ComponentFixture<CompliancePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliancePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
