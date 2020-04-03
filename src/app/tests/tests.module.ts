import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceTestComponent } from './components/price-test/price-test.component';
import {GoodsModule} from '@components/goods/goods.module';

@NgModule({
  declarations: [PriceTestComponent],
  imports: [
    CommonModule,
    GoodsModule
  ],
  exports: [
    PriceTestComponent
  ]
})
export class TestsModule { }
