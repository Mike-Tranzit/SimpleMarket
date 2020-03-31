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
  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.listOfProducts = this.goodsService.startGoodsPolling();
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    this.listOfProducts.unsubscribe();
  }
}
