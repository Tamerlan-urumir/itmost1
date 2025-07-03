import { TestBed } from '@angular/core/testing';

import { Qa } from './qa';

describe('Qa', () => {
  let service: Qa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Qa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
