import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NursePatients } from './nurse-patients';

describe('NursePatients', () => {
  let component: NursePatients;
  let fixture: ComponentFixture<NursePatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursePatients],
    }).compileComponents();

    fixture = TestBed.createComponent(NursePatients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
