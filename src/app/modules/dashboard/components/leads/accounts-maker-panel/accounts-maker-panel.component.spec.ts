import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsMakerPanelComponent } from './accounts-maker-panel.component';

describe('AccountsMakerPanelComponent', () => {
  let component: AccountsMakerPanelComponent;
  let fixture: ComponentFixture<AccountsMakerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsMakerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsMakerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
