import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityMapPage } from './security-map.page';

describe('SecurityMapPage', () => {
  let component: SecurityMapPage;
  let fixture: ComponentFixture<SecurityMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
