import { TestBed } from '@angular/core/testing';

import { InitialConfigurationsService } from './initial-configurations.service';

describe('InitialConfigurationsService', () => {
  let service: InitialConfigurationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialConfigurationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
