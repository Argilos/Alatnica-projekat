import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazdarenjeInProgressComponent } from './bazdarenje-in-progress.component';

describe('BazdarenjeInProgressComponent', () => {
  let component: BazdarenjeInProgressComponent;
  let fixture: ComponentFixture<BazdarenjeInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BazdarenjeInProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BazdarenjeInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
