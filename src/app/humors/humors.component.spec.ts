import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumorsComponent } from './humors.component';

describe('HumorsComponent', () => {
  let component: HumorsComponent;
  let fixture: ComponentFixture<HumorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
