import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsConsumedComponent } from './mark-as-consumed.component';

describe('MarkAsConsumedComponent', () => {
  let component: MarkAsConsumedComponent;
  let fixture: ComponentFixture<MarkAsConsumedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkAsConsumedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkAsConsumedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
