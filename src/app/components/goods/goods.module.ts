import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { BoxComponent } from './box/box.component';
import { PriceDirective } from '../../directives/price.directive';

@NgModule({
  declarations: [ListComponent, BoxComponent, PriceDirective],
  imports: [
    CommonModule
  ],
  exports: [ListComponent, BoxComponent]
})
export class GoodsModule { }
