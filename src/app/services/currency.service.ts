import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { randomIntegerGenerator } from '@models/utils/custom.utils';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public dollarExchangeRate: number;
  constructor() { }

  actualDollarExchangeRate(): void { // Observable<number>
    /*const randomInteger = randomIntegerGenerator(20, 80);
    console.log(randomInteger);
    return of(randomInteger).pipe(
      tap(result => this.dollarExchangeRate = result)
    );*/
    this.dollarExchangeRate = randomIntegerGenerator(20, 80);
  }
}
