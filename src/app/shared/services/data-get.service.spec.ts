import { TestBed } from '@angular/core/testing';

import { DataGet } from './data-get.service';

describe('DataGet', () => {
  let service: DataGet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
