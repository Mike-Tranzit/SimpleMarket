import { Directive, Input, SimpleChange, OnChanges, HostBinding } from '@angular/core';
import { PriceFieldColors } from '@models/enums/price.color.enum.js';

@Directive({
  selector: '[appPrice]'
})
export class PriceDirective implements OnChanges {
  @Input('price') price: any;
  @Input('previousPrice') previousPrice: any;
  @HostBinding('style.backgroundColor') priceFieldBgColor: string;
  @HostBinding('style.color') priceFieldColor: string;

  readonly FONT_COLOR_AFTER_CHANGE = '#FFFFFF';

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
    this.setColorAfterChange();
  }

  private setColorAfterChange(): void | unknown {
    if (this.priceFieldColor === this.FONT_COLOR_AFTER_CHANGE) {
      return;
    }
    this.priceFieldColor = this.FONT_COLOR_AFTER_CHANGE;
  }

  private priceBecomeLower(): void  {
    this.priceFieldBgColor = PriceFieldColors.DOWN;
  }

  private priceBecomeHigher(): void {
    this.priceFieldBgColor = PriceFieldColors.UP;
  }
}
