import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseEarnings } from './nurse-earnings';

describe('NurseEarnings', () => {
  let component: NurseEarnings;
  let fixture: ComponentFixture<NurseEarnings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseEarnings],
    }).compileComponents();

    fixture = TestBed.createComponent(NurseEarnings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
