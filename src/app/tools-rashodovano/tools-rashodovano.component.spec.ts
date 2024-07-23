import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsRashodovanoComponent } from './tools-rashodovano.component';

describe('ToolsRashodovanoComponent', () => {
  let component: ToolsRashodovanoComponent;
  let fixture: ComponentFixture<ToolsRashodovanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsRashodovanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolsRashodovanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
