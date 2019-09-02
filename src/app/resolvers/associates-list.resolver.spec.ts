import { TestBed } from '@angular/core/testing';

import { AssociatesListResolver } from './associates-list.resolver';

describe('AssociatesListResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociatesListResolver = TestBed.get(AssociatesListResolver);
    expect(service).toBeTruthy();
  });
});
