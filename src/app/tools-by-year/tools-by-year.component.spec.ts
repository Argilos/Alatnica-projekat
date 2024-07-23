import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsByYearComponent } from './tools-by-year.component';

describe('ToolsByYearComponent', () => {
  let component: ToolsByYearComponent;
  let fixture: ComponentFixture<ToolsByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsByYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolsByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
