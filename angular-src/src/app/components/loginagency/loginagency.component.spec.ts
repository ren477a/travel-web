import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginagencyComponent } from './loginagency.component';

describe('LoginagencyComponent', () => {
  let component: LoginagencyComponent;
  let fixture: ComponentFixture<LoginagencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginagencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginagencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
