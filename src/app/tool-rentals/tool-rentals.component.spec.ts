import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRentalsComponent } from './tool-rentals.component';

describe('ToolRentalsComponent', () => {
  let component: ToolRentalsComponent;
  let fixture: ComponentFixture<ToolRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolRentalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
