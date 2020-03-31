import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '@models/interfaces/goods.interface';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Output() lowerCountOfProduct = new EventEmitter<{goodsId: number, groupName: string}>();
  public shoppingCard = [];
  readonly INIT_COUNT_IN_SHOPPING_CARD = 1;

  constructor() { }

  ngOnInit(): void {
  }

  add({goodsId, price, goodsName, availableCount}: Product, groupName: string): void | never {
      const productIsAvailable = availableCount > 0;
      if (!productIsAvailable) {
        return;
      }
      const existingShoppingItem = this.shoppingCard.find(item => item.goodsId === goodsId);
      if (existingShoppingItem) {
        existingShoppingItem.count++;
      } else {
        this.shoppingCard.push({
            goodsId,
            price,
            count: this.INIT_COUNT_IN_SHOPPING_CARD,
            goodsName
        });
      }
      this.lowerCountOfProduct.emit({goodsId, groupName});
  }

  get shoppingCardIsEmpty(): boolean {
    return this.shoppingCard.length > 0;
  }
}
