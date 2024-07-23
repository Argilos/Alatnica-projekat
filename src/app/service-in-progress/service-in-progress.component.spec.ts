import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInProgressComponent } from './service-in-progress.component';

describe('ServiceInProgressComponent', () => {
  let component: ServiceInProgressComponent;
  let fixture: ComponentFixture<ServiceInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceInProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
