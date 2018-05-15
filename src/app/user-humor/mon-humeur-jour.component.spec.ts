import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonHumeurJourComponent } from './mon-humeur-jour.component';

describe('MonHumeurJourComponent', () => {
  let component: MonHumeurJourComponent;
  let fixture: ComponentFixture<MonHumeurJourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonHumeurJourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonHumeurJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
