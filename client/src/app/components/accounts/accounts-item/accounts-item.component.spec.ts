import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsItemComponent } from './accounts-item.component';

describe('AccountsItemComponent', () => {
  let component: AccountsItemComponent;
  let fixture: ComponentFixture<AccountsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
