import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IzdajAlatComponent } from './izdaj-alat.component';

describe('IzdajAlatComponent', () => {
  let component: IzdajAlatComponent;
  let fixture: ComponentFixture<IzdajAlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IzdajAlatComponent],
      imports: [ReactiveFormsModule], // Include ReactiveFormsModule here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzdajAlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed
});
