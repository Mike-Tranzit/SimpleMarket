import { Directive, Input, SimpleChange, OnChanges, HostBinding } from '@angular/core';
import { PriceFieldColors } from '@models/enums/price.color.enum.js';

@Directive({
  selector: '[appPrice]'
})
export class PriceDirective implements OnChanges{
  @Input('price') price: any;
  @Input('previousPrice') previousPrice: any;
  @HostBinding('style.color') priceFieldColor: string;

  constructor() {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void | unknown {
    if (!changes.price || !this.previousPrice) {
      return;
    }
    const { currentValue } = changes.price;
    if (this.pricesAreDifferent(currentValue)) {
        this.diffPrices(currentValue);
    }
  }

  private pricesAreDifferent(currentValue): boolean {
    return currentValue !== this.previousPrice;
  }

  private diffPrices(currentValue): void {
    if (currentValue > this.previousPrice) {
      this.priceBecomeHigher();
    } else {
      this.priceBecomeLower();
    }
  }

  private priceBecomeLower(): void  {
    this.priceFieldColor = PriceFieldColors.DOWN;
  }

  private priceBecomeHigher(): void {
    this.priceFieldColor = PriceFieldColors.UP;
  }
}
