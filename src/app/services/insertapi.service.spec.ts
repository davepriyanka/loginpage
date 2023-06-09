import { TestBed } from '@angular/core/testing';

import { InsertapiService } from './insertapi.service';

describe('InsertapiService', () => {
  let service: InsertapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
