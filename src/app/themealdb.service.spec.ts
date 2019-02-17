import { TestBed } from '@angular/core/testing';

import { ThemealdbService } from './themealdb.service';

describe('ThemealdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemealdbService = TestBed.get(ThemealdbService);
    expect(service).toBeTruthy();
  });
});
