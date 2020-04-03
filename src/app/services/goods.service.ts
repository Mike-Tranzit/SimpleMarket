import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from '@services/currency.service';
import {
  map,
  pluck,
  startWith,
  switchMap,
  take
} from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';

import { DATA, NAMES } from '@services/api';
import { GoodsWrapper, GoodsPricesBuffer } from '@models/interfaces/goods.interface';

import { sortGoodsWithCategories } from '@models/utils/goods.utils';
import { CategoriesActionsHandler } from '@models/utils/category-proxy.utils';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  public categoriesActionsHandler;
  public goodsPricesBuffer: GoodsPricesBuffer;
  readonly INTERVAL_UPDATE_DATA = 15000;

  constructor(private http: HttpClient, private currencyService: CurrencyService) { }

  public async loadCategories(): Promise<any> {
      const categories = await this.http.get(NAMES).toPromise();
      this.categoriesActionsHandler = new CategoriesActionsHandler(categories);
  }

  public loadGoods() {
    return this.http.get(DATA)
      .pipe(
        take(1),
        pluck('Value'),
        map((goodsData: GoodsWrapper) => {
          this.currencyService.actualDollarExchangeRate();
          const payload = {
            goodsData: goodsData.Goods,
            categories: this.categoriesActionsHandler,
            exchangeRate: this.currencyService.dollarExchangeRate,
            goodsPricesBuffer: this.goodsPricesBuffer
          };
          const { actualData, cloneGoodsPricesBuffer } = sortGoodsWithCategories(payload);
          this.goodsPricesBuffer = {...cloneGoodsPricesBuffer};
          return actualData;
        })
      );
  }

  public startGoodsPolling() {
    const loadData$ = this.loadGoods();

    return interval(this.INTERVAL_UPDATE_DATA)
      .pipe(
          startWith(0),
          switchMap(() => loadData$)
      );
  }
}
