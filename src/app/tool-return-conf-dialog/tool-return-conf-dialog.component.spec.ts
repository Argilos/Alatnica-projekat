import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolReturnConfDialogComponent } from './tool-return-conf-dialog.component';

describe('ToolReturnConfDialogComponent', () => {
  let component: ToolReturnConfDialogComponent;
  let fixture: ComponentFixture<ToolReturnConfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolReturnConfDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolReturnConfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
