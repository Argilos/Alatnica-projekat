import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledAlataComponent } from './pregled-alata.component';

describe('PregledAlataComponent', () => {
  let component: PregledAlataComponent;
  let fixture: ComponentFixture<PregledAlataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledAlataComponent]
    });
    fixture = TestBed.createComponent(PregledAlataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
