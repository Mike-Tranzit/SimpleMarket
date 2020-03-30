import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DATA, NAMES } from '@services/api';

export const CategoriesActionsHandler = new Proxy(Array, {
      construct(target: ArrayConstructor, argArray: any, newTarget?: any): object {
        const cache = {};
        return new Proxy(new target(...argArray), {
          get(arr, prop) {
            const targetArray = arr[0];
            switch (prop) {
              case 'findById': {
                return id => {
                  const newCache = typeof cache[id] === 'undefined';
                  if (newCache) {
                    cache[id] = targetArray[id];
                  }
                  return cache[id];
                };
                break;
              }
              default: {
                return targetArray[prop];
              }
            }
          }
        });
      }
});


@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  public categoriesProxy: any;
  constructor(private http: HttpClient) { }

  public loadCategories(): Promise<any> {
      return this.http.get(NAMES).toPromise()
      .then(categories => {
          this.categoriesProxy = new CategoriesActionsHandler(categories);
      });
  }

  public loadGoods(): Observable<any> {
    return this.http.get(DATA)
      .pipe(
        take(1),
        map((goodsData) => this.sortGoods(goodsData))
      );
  }

  public sortGoods({Value: { Goods: goodsData }}: any) {
    const newObj = {};
    for (const item of goodsData) {
      const {C: price, T: goodsId, G: categoryId, P: count} = item;
      const {G: categoryName, B: listOfGoods} = this.categoriesProxy.findById(categoryId);

      if (!(categoryName in newObj)) {
        newObj[categoryName] = new Array();
      }
      newObj[categoryName].push({
        price,
        goodsId,
        categoryId,
        count,
        goodsName: listOfGoods[item.T]
      });
    }
    return newObj;
  }
}
