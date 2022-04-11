import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshLeadsComponent } from './fresh-leads.component';

describe('FreshLeadsComponent', () => {
  let component: FreshLeadsComponent;
  let fixture: ComponentFixture<FreshLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreshLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
