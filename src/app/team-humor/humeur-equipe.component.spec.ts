import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumeurEquipeComponent } from './humeur-equipe.component';

describe('HumeurEquipeComponent', () => {
  let component: HumeurEquipeComponent;
  let fixture: ComponentFixture<HumeurEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumeurEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumeurEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
