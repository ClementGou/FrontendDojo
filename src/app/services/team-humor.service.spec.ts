import { TestBed, inject } from '@angular/core/testing';

import { TeamHumorService } from './team-humor.service';

describe('TeamHumorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamHumorService]
    });
  });

  it('should be created', inject([TeamHumorService], (service: TeamHumorService) => {
    expect(service).toBeTruthy();
  }));
});
