import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteragencyComponent } from './registeragency.component';

describe('RegisteragencyComponent', () => {
  let component: RegisteragencyComponent;
  let fixture: ComponentFixture<RegisteragencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteragencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
