import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorToday } from './doctor-today';

describe('DoctorToday', () => {
  let component: DoctorToday;
  let fixture: ComponentFixture<DoctorToday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorToday],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorToday);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
