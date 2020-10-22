import { TestBed } from '@angular/core/testing';

import { FakebackendInterceptor } from './fakebackend.interceptor';

describe('FakebackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FakebackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FakebackendInterceptor = TestBed.inject(FakebackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
