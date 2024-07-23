import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NalogListaComponent } from './nalog-lista.component';

describe('NalogListaComponent', () => {
  let component: NalogListaComponent;
  let fixture: ComponentFixture<NalogListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NalogListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NalogListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
