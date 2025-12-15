import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopusermenuComponent } from './topusermenu.component';

describe('TopusermenuComponent', () => {
  let component: TopusermenuComponent;
  let fixture: ComponentFixture<TopusermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopusermenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopusermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
