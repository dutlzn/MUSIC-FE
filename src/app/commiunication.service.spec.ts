import { TestBed } from '@angular/core/testing';

import { CommiunicationService } from './commiunication.service';

describe('CommiunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommiunicationService = TestBed.get(CommiunicationService);
    expect(service).toBeTruthy();
  });
});
