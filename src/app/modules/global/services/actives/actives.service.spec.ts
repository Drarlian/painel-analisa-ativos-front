import { TestBed } from '@angular/core/testing';

import { ActivesService } from './actives.service';

describe('ActivesService', () => {
  let service: ActivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
