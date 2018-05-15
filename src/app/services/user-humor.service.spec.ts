import { TestBed, inject } from '@angular/core/testing';

import { UserHumorService } from './user-humor.service';

describe('UserHumorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserHumorService]
    });
  });

  it('should be created', inject([UserHumorService], (service: UserHumorService) => {
    expect(service).toBeTruthy();
  }));
});
