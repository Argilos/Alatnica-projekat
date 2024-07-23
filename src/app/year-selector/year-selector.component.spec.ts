import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelectorComponent } from './year-selector.component';

describe('YearSelectorComponent', () => {
  let component: YearSelectorComponent;
  let fixture: ComponentFixture<YearSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
