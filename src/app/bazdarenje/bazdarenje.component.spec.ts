import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazdarenjeComponent } from './bazdarenje.component';

describe('BazdarenjeComponent', () => {
  let component: BazdarenjeComponent;
  let fixture: ComponentFixture<BazdarenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BazdarenjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BazdarenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
