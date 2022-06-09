import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuperAdminComponent } from './test-super-admin.component';

describe('TestSuperAdminComponent', () => {
  let component: TestSuperAdminComponent;
  let fixture: ComponentFixture<TestSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSuperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
