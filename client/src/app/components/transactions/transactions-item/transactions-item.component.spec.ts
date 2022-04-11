import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsItemComponent } from './transactions-item.component';

describe('TransactionsItemComponent', () => {
  let component: TransactionsItemComponent;
  let fixture: ComponentFixture<TransactionsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
