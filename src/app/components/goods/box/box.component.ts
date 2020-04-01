import {Component, OnInit, Output, EventEmitter, OnChanges, Input} from '@angular/core';
import { GoodsToView, Product } from '@models/interfaces/goods.interface';
import { ProductInBox } from '@models/types/product.type';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input('listOfProductsData') listOfProductsData: GoodsToView[];
  @Output() updateCountOfProduct = new EventEmitter<{goodsId: number, groupName: string, count: number}>();
  public shoppingCard = [];
  public totalAmount = 0;
  readonly INIT_COUNT_IN_SHOPPING_CARD = 1;

  constructor() { }

  ngOnInit(): void {
  }

  add(product: Product, groupName: string): void | unknown {
      const {goodsId, price, goodsName, availableCount} = product;
      const productIsAvailable = availableCount > 0;
      if (!productIsAvailable) {
        return;
      }
      const existingShoppingItem = this.shoppingCard.find(item => item.goodsId === goodsId);
      if (existingShoppingItem) {
        existingShoppingItem.count++;
      } else {

        const initBoxProductState: ProductInBox  = {
          goodsId,
          price,
          count: this.INIT_COUNT_IN_SHOPPING_CARD,
          goodsName,
          groupName
        };
        this.shoppingCard.push(initBoxProductState);

      }
      product.availableCount--;
      this.calculateTotalAmount();
  }

  private calculateTotalAmount(): void {
    const totalAmount = this.shoppingCard.reduce((acc, current) => {acc = acc + (current.price * current.count); return acc; } , 0);
    const fractionDigits = 2;
    this.totalAmount = totalAmount.toFixed(fractionDigits);
  }

  deleteProduct(event: Event, key: number): void {
      event.preventDefault();
      const product = this.shoppingCard[key];
      this.updateCountOfProduct.emit({
        goodsId: product.goodsId,
        groupName: product.groupName,
        count: product.count
      });
      this.shoppingCard.splice(key, 1);
      this.calculateTotalAmount();
  }

  get shoppingCardIsEmpty(): boolean {
    return this.shoppingCard.length > 0;
  }

  trackByFn(index): number {
    return index;
  }

  checkAvailableCount(value: number, product: ProductInBox) {
      const item = this.listOfProductsData[product.groupName].find(i => i.goodsId === product.goodsId);
      if (item) {
        console.log(item.availableCount, value);
        if (item.availableCount < value) {
          product.count = item.availableCount;
        }
        item.availableCount = item.availableCount - product.count;
      }
  }
}
