import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityHomePage } from './security-home.page';

describe('SecurityHomePage', () => {
  let component: SecurityHomePage;
  let fixture: ComponentFixture<SecurityHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
