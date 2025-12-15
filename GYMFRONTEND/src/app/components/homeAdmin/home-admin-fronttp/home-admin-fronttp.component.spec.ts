import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminFronttpComponent } from './home-admin-fronttp.component';

describe('HomeAdminFronttpComponent', () => {
  let component: HomeAdminFronttpComponent;
  let fixture: ComponentFixture<HomeAdminFronttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdminFronttpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminFronttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
