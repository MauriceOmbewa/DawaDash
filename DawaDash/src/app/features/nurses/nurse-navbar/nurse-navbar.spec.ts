import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseNavbar } from './nurse-navbar';

describe('NurseNavbar', () => {
  let component: NurseNavbar;
  let fixture: ComponentFixture<NurseNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(NurseNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
