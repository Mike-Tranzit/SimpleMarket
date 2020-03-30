import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { BoxComponent } from './box/box.component';

@NgModule({
  declarations: [ListComponent, BoxComponent],
  imports: [
    CommonModule
  ],
  exports: [ListComponent]
})
export class GoodsModule { }
