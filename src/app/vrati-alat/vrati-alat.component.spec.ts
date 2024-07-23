import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VratiAlatComponent } from './vrati-alat.component';

describe('VratiAlatComponent', () => {
  let component: VratiAlatComponent;
  let fixture: ComponentFixture<VratiAlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VratiAlatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VratiAlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
