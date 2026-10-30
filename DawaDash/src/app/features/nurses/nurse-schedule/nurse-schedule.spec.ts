import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseSchedule } from './nurse-schedule';

describe('NurseSchedule', () => {
  let component: NurseSchedule;
  let fixture: ComponentFixture<NurseSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseSchedule],
    }).compileComponents();

    fixture = TestBed.createComponent(NurseSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
