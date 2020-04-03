import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate value between 2 and 80', () => {
    service.actualDollarExchangeRate();
    expect(service.dollarExchangeRate > 20).toBe(true);
    expect(service.dollarExchangeRate < 80).toBe(true);
  });
});
