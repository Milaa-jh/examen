import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityLoginPage } from './security-login.page';

describe('SecurityLoginPage', () => {
  let component: SecurityLoginPage;
  let fixture: ComponentFixture<SecurityLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
