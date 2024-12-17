import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotonSosPage } from './boton-sos.page';

describe('BotonSosPage', () => {
  let component: BotonSosPage;
  let fixture: ComponentFixture<BotonSosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonSosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
