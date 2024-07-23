import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDetailsDialogComponent } from './rental-details-dialog.component';

describe('RentalDetailsDialogComponent', () => {
  let component: RentalDetailsDialogComponent;
  let fixture: ComponentFixture<RentalDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
