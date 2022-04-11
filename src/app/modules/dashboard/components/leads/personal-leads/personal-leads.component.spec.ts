import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLeadsComponent } from './personal-leads.component';

describe('PersonalLeadsComponent', () => {
  let component: PersonalLeadsComponent;
  let fixture: ComponentFixture<PersonalLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
