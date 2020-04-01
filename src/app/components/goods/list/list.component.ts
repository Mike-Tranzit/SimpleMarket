import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BoxComponent } from '@components/goods/box/box.component';
import { GoodsService } from '@services/goods.service';
import {GoodsToView, Product} from '@models/interfaces/goods.interface.js';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('box', {static: false}) box: BoxComponent;
  public listOfProducts;
  public listOfProductsData: GoodsToView[];
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.listOfProducts = this.goodsService.startGoodsPolling().subscribe(data => this.listOfProductsData = data);
  }

  updateCountOfProduct({goodsId, groupName, count}: {goodsId: number, groupName: string, count: number}): void {
    const item = this.listOfProductsData[groupName].find(product => product.goodsId === goodsId);
    if (item) {
      item.availableCount = item.availableCount + count;
    }
  }

  trackByFn(index): number {
    return index;
  }

  ngOnDestroy() {
    this.listOfProducts.unsubscribe();
  }
}
