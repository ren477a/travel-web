import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetoursComponent } from './managetours.component';

describe('ManagetoursComponent', () => {
  let component: ManagetoursComponent;
  let fixture: ComponentFixture<ManagetoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
