import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalLeadsComponent } from './add-personal-leads.component';

describe('AddPersonalLeadsComponent', () => {
  let component: AddPersonalLeadsComponent;
  let fixture: ComponentFixture<AddPersonalLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonalLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonalLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
