import { TestBed } from '@angular/core/testing';

import { AuthinsertService } from './authinsert.service';

describe('AuthinsertService', () => {
  let service: AuthinsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthinsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
