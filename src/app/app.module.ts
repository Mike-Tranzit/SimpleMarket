import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoodsModule } from '@components/goods/goods.module';

import { GoodsService } from '@services/goods.service';

export function CategoriesPreloader(goodsServices: GoodsService) {
  return () => goodsServices.loadCategories();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoodsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: CategoriesPreloader,
      deps: [GoodsService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
