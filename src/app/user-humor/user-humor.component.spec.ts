import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHumorComponent } from './user-humor.component';

describe('UserHumorComponent', () => {
  let component: UserHumorComponent;
  let fixture: ComponentFixture<UserHumorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHumorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHumorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
