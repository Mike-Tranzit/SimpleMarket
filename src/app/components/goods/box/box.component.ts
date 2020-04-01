import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChange
} from '@angular/core';
import { GoodsToView, Product } from '@models/interfaces/goods.interface';
import { ProductInBox } from '@models/types/product.type';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnInit, OnChanges {
  @Input() listOfProductsData: GoodsToView[];
  @Output() updateCountOfProduct = new EventEmitter<{goodsId: number, groupName: string, count: number}>();
  public shoppingCard: ProductInBox[] = [];
  public totalAmount = 0;
  readonly INIT_COUNT_IN_SHOPPING_CARD = 1;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    const listWasChanged = changes.listOfProductsData !== null && changes.listOfProductsData.previousValue;
    if (listWasChanged) {
      const { currentValue } = changes.listOfProductsData;
      for (const itemOfCard of this.shoppingCard) {
        const item = this.listOfProductsData[itemOfCard.groupName].find(product => product.goodsId === itemOfCard.goodsId);
      }
    }
  }

  add(product: Product, groupName: string): void | unknown {
      const {goodsId, price, goodsName, availableCount} = product;
      const productIsAvailable = availableCount > 0;
      if (!productIsAvailable) {
        return;
      }
      const existingShoppingItem = (this.shoppingCard as ProductInBox[]).find(item => item.goodsId === goodsId);
      if (existingShoppingItem) {
        existingShoppingItem.count = +existingShoppingItem.count + 1;
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
      this.cdr.detectChanges();
  }

  private calculateTotalAmount(): void {
    const totalAmount = this.shoppingCard.reduce((acc, current) => {acc = acc + (current.price * +current.count); return acc; } , 0);
    const fractionDigits = 2;
    this.totalAmount = +totalAmount.toFixed(fractionDigits);
  }

  deleteProduct(event: Event, key: number): void {
      event.preventDefault();
      const product = this.shoppingCard[key];
      this.updateCountOfProduct.emit({
        goodsId: product.goodsId,
        groupName: product.groupName,
        count: +product.count
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

  checkAvailableCount(event: KeyboardEvent, product: ProductInBox): void | unknown {
        const element = (event.target as HTMLInputElement);
        const value = +element.value;
        if (Number.isNaN(value) || value === product.count) {
          const newElementValue = element.value === '' ? element.value : String(product.count);
          element.value = newElementValue;
          return;
        }
        const item = this.listOfProductsData[product.groupName].find(i => i.goodsId === product.goodsId);
        if (item) {
          const availableCount = item.availableCount;
          const productCount = +product.count;
          const countBecameLow = value < productCount;

          if (countBecameLow) {
            product.count = value > 0 ? value : '';
            item.availableCount = availableCount + (productCount - value);
          } else {
            const availableCountToOrder = availableCount + productCount;
            const exceededLimit = availableCountToOrder < value;
            if (exceededLimit) {
              product.count = availableCountToOrder;
              item.availableCount = 0;
            } else {
              const newAvailableCount = availableCountToOrder - value;
              product.count = value;
              item.availableCount = newAvailableCount < 0 ? 0 : newAvailableCount;
            }
          }
        }
  }
}
