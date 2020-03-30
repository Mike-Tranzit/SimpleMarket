import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoodsService } from '@services/goods.service';
import { map, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { ICategories, ICategory } from '@models/ICategories';
import { IGoods } from '@models/IGoods';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private polingIsActive = true;
  public goodsData: IGoods[];
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    const setGoodsData = (result: any) => this.goodsData = result;
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.goodsService.loadGoods())
      )
      .subscribe((result) => {
        console.log(result);
      });
  }

  ngOnDestroy() {
    this.polingIsActive = false;
  }
}
