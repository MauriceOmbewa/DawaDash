import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminChemists } from './admin-chemists';

describe('AdminChemists', () => {
  let component: AdminChemists;
  let fixture: ComponentFixture<AdminChemists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChemists],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminChemists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
