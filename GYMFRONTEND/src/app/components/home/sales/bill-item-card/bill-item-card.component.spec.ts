import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemCardComponent } from './bill-item-card.component';

describe('BillItemCardComponent', () => {
  let component: BillItemCardComponent;
  let fixture: ComponentFixture<BillItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillItemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
