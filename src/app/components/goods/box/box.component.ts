import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
  SimpleChange
} from '@angular/core';
import { GoodsToView, Product } from '@models/interfaces/goods.interface';
import { ProductInBox, UpdateProductPayload } from '@models/types/product.type';
import { inputValueNotNull } from '@models/decorators/input-not-null.decorator';
import { findElement, getProperty, findCb } from '@models/utils/custom.utils';
import { BoxOrderChecker } from '@models/classes/box-order-checker.class';
import { ProductCountActionEnum } from '@models/enums/product-count-action.enum';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit, OnChanges {
  @Input() listOfProductsData: GoodsToView[];
  @Output() updateCountOfProduct = new EventEmitter<UpdateProductPayload>();
  public shoppingCard: ProductInBox[] = [];
  public totalAmount = 0;
  readonly INIT_COUNT_IN_SHOPPING_CARD = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    const listWasChanged = changes.listOfProductsData !== null && getProperty(changes.listOfProductsData, 'previousValue');
    if (listWasChanged) {
      this.updateProductsInBoxAfterDc(changes.listOfProductsData);
    }
  }

  private updateProductsInBoxAfterDc({ currentValue }) {
    for (const key of Object.keys(this.shoppingCard)) {

      const itemOfCard = this.shoppingCard[key];
      const propertyName = getProperty(itemOfCard, 'groupName');
      const item = findElement<Product>(currentValue[propertyName], findCb(itemOfCard, 'goodsId'));

      if (item) {
        const exceededLimit = itemOfCard.count > item.availableCount;
        if (exceededLimit) {
          itemOfCard.count = item.availableCount;
        } else {
          item.availableCount = item.availableCount - itemOfCard.count;
        }
        itemOfCard.price = item.price;
      } else {
        this.deleteProductByKey(itemOfCard, key);
      }
    }
    this.calculateTotalAmount();
  }

  add(product: Product, groupName: any): void | unknown {
      const { availableCount } = product;
      const productIsAvailable = availableCount > 0;
      if (!productIsAvailable) {
        return;
      }

      let existingShoppingItem = findElement<ProductInBox>((this.shoppingCard as ProductInBox[]), findCb(product, 'goodsId'));
      if (!existingShoppingItem) {
        existingShoppingItem = this.addInitValueToBox(product, groupName);
      }
      this.increaseProductCount(existingShoppingItem);
      this.emitChangeCountOfProductsInList(existingShoppingItem, ProductCountActionEnum.DECREASE);
      this.calculateTotalAmount();
  }

  increaseProductCount(existingShoppingItem: ProductInBox) {
    existingShoppingItem.count = +existingShoppingItem.count + 1;
  }

  addInitValueToBox(product: Product, groupName: string) {
    const {goodsId, price, goodsName} = product;
    const initBoxProductState: ProductInBox  = {
      goodsId,
      price,
      count: this.INIT_COUNT_IN_SHOPPING_CARD,
      goodsName,
      groupName
    };
    this.shoppingCard.push(initBoxProductState);
    return initBoxProductState;
  }

  private calculateTotalAmount(): void {
    const totalAmount = this.shoppingCard.reduce((acc, current) => {
      return acc + (current.price * +current.count);
     } , 0);
    const fractionDigits = 2;
    this.totalAmount = +totalAmount.toFixed(fractionDigits);
  }

  deleteProduct(event: Event, key: number): void {
      event.preventDefault();
      const product = this.shoppingCard[key];
      this.deleteProductByKey(product, key);
      this.calculateTotalAmount();
  }

  private deleteProductByKey(product, key) {
    this.emitChangeCountOfProductsInList(product, ProductCountActionEnum.INCREASE);
    this.shoppingCard.splice(key, 1);
  }

  private emitChangeCountOfProductsInList(product: ProductInBox, action: string) {
    this.updateCountOfProduct.emit({
      goodsId: product.goodsId,
      groupName: product.groupName,
      count: +product.count,
      action
    });
  }

  get shoppingCardIsEmpty(): boolean {
    return this.shoppingCard.length > 0;
  }

  trackByFn(index): number {
    return index;
  }

  @inputValueNotNull
  checkAvailableCount(element: HTMLInputElement, productInBox: ProductInBox): void {
        const propertyName = getProperty(productInBox, 'groupName');
        const product = findElement<Product>(this.listOfProductsData[propertyName], findCb(productInBox, 'goodsId'));

        const payload = {
          product,
          productInBox,
          element,
        };

        const model = new BoxOrderChecker(payload).convertAndSetParams();
        const actions = model.checkValueBecameLow() || model.checkValueExceededLimit() || model.setNewAvailableCount();
        if (actions) {
          this.calculateTotalAmount();
        }
  }
}
