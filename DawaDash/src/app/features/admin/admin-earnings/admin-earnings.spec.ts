import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEarnings } from './admin-earnings';

describe('AdminEarnings', () => {
  let component: AdminEarnings;
  let fixture: ComponentFixture<AdminEarnings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEarnings],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEarnings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
