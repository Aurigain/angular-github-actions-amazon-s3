import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarBottomComponent } from './top-navbar-bottom.component';

describe('TopNavbarBottomComponent', () => {
  let component: TopNavbarBottomComponent;
  let fixture: ComponentFixture<TopNavbarBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavbarBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
