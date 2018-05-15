import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamHumorComponent } from './team-humor.component';

describe('TeamHumorComponent', () => {
  let component: TeamHumorComponent;
  let fixture: ComponentFixture<TeamHumorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamHumorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamHumorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
