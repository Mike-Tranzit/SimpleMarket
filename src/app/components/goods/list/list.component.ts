import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BoxComponent } from '@components/goods/box/box.component';
import { GoodsService } from '@services/goods.service';
import { GoodsToView, Product } from '@models/interfaces/goods.interface.js';
import { UpdateProductPayload } from '@models/types/product.type';
import { ProductCountActionEnum } from '@models/enums/product-count-action.enum';
import { findElement } from '@models/utils/custom.utils';

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

  updateCountOfProduct({goodsId, groupName, count, action}: UpdateProductPayload): void {
    const cb = product => product.goodsId === goodsId;
    const item = findElement<any>(this.listOfProductsData[groupName], cb);
    if (item) {
      switch (action) {
        case ProductCountActionEnum.INCREASE: {
          item.availableCount = item.availableCount + count;
          break;
        }
        case ProductCountActionEnum.DECREASE: {
          item.availableCount--;
          break;
        }
        default:
      }
    }
  }

  trackByFn(index): number {
    return index;
  }

  ngOnDestroy() {
    this.listOfProducts.unsubscribe();
  }
}
