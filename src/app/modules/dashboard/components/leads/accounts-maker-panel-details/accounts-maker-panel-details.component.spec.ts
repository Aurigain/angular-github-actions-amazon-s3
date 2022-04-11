import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsMakerPanelDetailsComponent } from './accounts-maker-panel-details.component';

describe('AccountsMakerPanelDetailsComponent', () => {
  let component: AccountsMakerPanelDetailsComponent;
  let fixture: ComponentFixture<AccountsMakerPanelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsMakerPanelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsMakerPanelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
