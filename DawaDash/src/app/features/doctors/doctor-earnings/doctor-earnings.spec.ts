import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorEarnings } from './doctor-earnings';

describe('DoctorEarnings', () => {
  let component: DoctorEarnings;
  let fixture: ComponentFixture<DoctorEarnings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorEarnings],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorEarnings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
