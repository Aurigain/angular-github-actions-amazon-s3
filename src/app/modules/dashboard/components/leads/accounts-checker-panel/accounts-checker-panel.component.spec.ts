import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCheckerPanelComponent } from './accounts-checker-panel.component';

describe('AccountsCheckerPanelComponent', () => {
  let component: AccountsCheckerPanelComponent;
  let fixture: ComponentFixture<AccountsCheckerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsCheckerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCheckerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
