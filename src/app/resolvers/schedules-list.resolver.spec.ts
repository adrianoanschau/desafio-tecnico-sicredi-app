import { TestBed } from '@angular/core/testing';

import { SchedulesListResolver } from './schedules-list.resolver';

describe('SchedulesListResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulesListResolver = TestBed.get(SchedulesListResolver);
    expect(service).toBeTruthy();
  });
});
