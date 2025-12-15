import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopadminmenuComponent } from './topadminmenu.component';

describe('TopadminmenuComponent', () => {
  let component: TopadminmenuComponent;
  let fixture: ComponentFixture<TopadminmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopadminmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopadminmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
