import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServisComponent } from './servis.component';  // Import your component
import { CommonModule } from '@angular/common';  // Import CommonModule

describe('ServisComponent', () => {
  let component: ServisComponent;
  let fixture: ComponentFixture<ServisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServisComponent],
      imports: [CommonModule]  // Include CommonModule here
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
