import { Injectable } from '@angular/core';
import { randomIntegerGenerator } from '@models/utils/custom.utils';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public dollarExchangeRate: number;
  constructor() { }

  actualDollarExchangeRate(): void {
    this.dollarExchangeRate = randomIntegerGenerator(20, 80);
  }
}
