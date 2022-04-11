import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreshLeadsComponent } from './add-fresh-leads.component';

describe('AddFreshLeadsComponent', () => {
  let component: AddFreshLeadsComponent;
  let fixture: ComponentFixture<AddFreshLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFreshLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFreshLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
