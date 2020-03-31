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

  updateCountOfProduct({goodsId, groupName, count}) {
    const item = this.listOfProductsData[groupName].find(product => product.goodsId === goodsId);
    if (item) {
      item.availableCount = item.availableCount + count;
    }
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    this.listOfProducts.unsubscribe();
  }
}
