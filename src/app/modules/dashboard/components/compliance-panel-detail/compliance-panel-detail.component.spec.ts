import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancePanelDetailComponent } from './compliance-panel-detail.component';

describe('CompliancePanelDetailComponent', () => {
  let component: CompliancePanelDetailComponent;
  let fixture: ComponentFixture<CompliancePanelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliancePanelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancePanelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
