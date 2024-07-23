import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicnaKartaComponent } from './unesi-novi-alat';

describe('LicnaKartaComponent', () => {
  let component: LicnaKartaComponent;
  let fixture: ComponentFixture<LicnaKartaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicnaKartaComponent]
    });
    fixture = TestBed.createComponent(LicnaKartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
