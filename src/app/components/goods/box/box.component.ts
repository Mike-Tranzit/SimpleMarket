import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '@models/interfaces/goods.interface';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Output() updateCountOfProduct = new EventEmitter<{goodsId: number, groupName: string, count: number}>();
  public shoppingCard = [];
  public totalAmount = 0;
  readonly INIT_COUNT_IN_SHOPPING_CARD = 1;

  constructor() { }

  ngOnInit(): void {
  }

  add(product: Product, groupName: string): void | never {
      const {goodsId, price, goodsName, availableCount} = product;
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
            goodsName,
            groupName
        });
      }
      product.availableCount--;
      this.calculateTotalAmount();
  }

  private calculateTotalAmount() {
    const totalAmount = this.shoppingCard.reduce((acc, current) => {acc = acc + (current.price * current.count); return acc; } , 0);
    const fractionDigits = 2;
    this.totalAmount = totalAmount.toFixed(fractionDigits);
  }

  deleteProduct(key: number): void {
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

  trackByFn(index) {
    return index;
  }
}
