import { TestBed, inject } from '@angular/core/testing';

import { TravellerService } from './traveller.service';

describe('TravellerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravellerService]
    });
  });

  it('should ...', inject([TravellerService], (service: TravellerService) => {
    expect(service).toBeTruthy();
  }));
});
