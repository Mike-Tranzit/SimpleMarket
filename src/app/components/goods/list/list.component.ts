import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BoxComponent } from '@components/goods/box/box.component';
import { GoodsService } from '@services/goods.service';
import { GoodsToView } from '@models/interfaces/goods.interface.js';
import { ProductInBox } from '@models/types/product.type';

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
    this.listOfProducts = this.goodsService.startGoodsPolling().subscribe((data: GoodsToView[]) => this.listOfProductsData = data);
  }

  updateCountOfProduct({goodsId, groupName, count}: Pick<ProductInBox, 'goodsId' | 'groupName' | 'count'>): void {
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
