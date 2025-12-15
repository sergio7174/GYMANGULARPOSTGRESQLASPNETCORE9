import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackEditComponent } from './pack-edit.component';

describe('PackEditComponent', () => {
  let component: PackEditComponent;
  let fixture: ComponentFixture<PackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
