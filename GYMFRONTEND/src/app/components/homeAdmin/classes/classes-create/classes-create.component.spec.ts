import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCreateComponent } from './classes-create.component';

describe('ClassesCreateComponent', () => {
  let component: ClassesCreateComponent;
  let fixture: ComponentFixture<ClassesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
