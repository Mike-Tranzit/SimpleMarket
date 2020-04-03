import {Product} from '@models/interfaces/goods.interface';
import {ProductInBox} from '@models/types/product.type';

export class BoxOrderChecker {
  private product: Product;
  private productInBox: ProductInBox;
  private element: HTMLInputElement;
  private inputValue: number;
  private availableCount: number;
  private productCount: number;
  private availableCountToOrder: number;

  constructor({product, productInBox, element}: {product: Product, productInBox: ProductInBox, element: HTMLInputElement}) {
    this.product = product;
    this.productInBox = productInBox;
    this.element = element;
  }

  public convertAndSetParams() {
    this.availableCount = this.product.availableCount;
    this.productCount = +this.productInBox.count;
    this.inputValue = +this.element.value;
    this.availableCountToOrder = this.availableCount + this.productCount;
    return this;
  }

  public checkValueBecameLow() {
    const countBecameUp = this.inputValue > this.productCount;
    if (countBecameUp) {
      return false;
    }
    const newProductInBoxCount = this.inputValue > 0 ? this.inputValue : '';
    const newAvailableCount = this.availableCount + (this.productCount - this.inputValue);
    this.setNewValuesOfCounts(newProductInBoxCount, newAvailableCount);
    return true;
  }

  public checkValueExceededLimit() {
    const exceededLimit = this.availableCountToOrder > this.inputValue;
    if (exceededLimit) {
      return false;
    }
    this.element.value = String(this.availableCountToOrder);
    this.setNewValuesOfCounts(this.availableCountToOrder);
    return true;
  }

  public setNewAvailableCount() {
    const countDiffValue = this.availableCountToOrder - this.inputValue;
    const newAvailableCount = countDiffValue < 0 ? 0 : countDiffValue;
    this.setNewValuesOfCounts(this.inputValue, newAvailableCount);
    return true;
  }

  public setNewValuesOfCounts(productInBoxCount: number | string, productCount: number = 0) {
    this.productInBox.count = productInBoxCount;
    this.product.availableCount = productCount;
  }
}
