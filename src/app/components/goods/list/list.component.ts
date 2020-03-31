import { Component, OnInit, OnDestroy, ViewChild, SimpleChange, OnChanges } from '@angular/core';
import { BoxComponent } from '@components/goods/box/box.component';
import { GoodsService } from '@services/goods.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('box', {static: false}) box: BoxComponent;
  public listOfProducts;
  public listOfProductsData;
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.listOfProducts = this.goodsService.startGoodsPolling().subscribe(data => this.listOfProductsData = data);
  }

  lowerCountOfProduct({goodsId, groupName}): void {
    let product = this.listOfProductsData[groupName].find(item => item.goodsId === goodsId);
    if (product) {
      product = {...product, availableCount: product.availableCount--};
    }
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    this.listOfProducts.unsubscribe();
  }
}
