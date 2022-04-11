import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCheckerPanelDetailsComponent } from './accounts-checker-panel-details.component';

describe('AccountsCheckerPanelDetailsComponent', () => {
  let component: AccountsCheckerPanelDetailsComponent;
  let fixture: ComponentFixture<AccountsCheckerPanelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsCheckerPanelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCheckerPanelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
