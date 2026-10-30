import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseToday } from './nurse-today';

describe('NurseToday', () => {
  let component: NurseToday;
  let fixture: ComponentFixture<NurseToday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseToday],
    }).compileComponents();

    fixture = TestBed.createComponent(NurseToday);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
