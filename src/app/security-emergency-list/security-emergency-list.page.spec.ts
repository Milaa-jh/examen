import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityEmergencyListPage } from './security-emergency-list.page';

describe('SecurityHomePage', () => {
  let component: SecurityEmergencyListPage;
  let fixture: ComponentFixture<SecurityEmergencyListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityEmergencyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
