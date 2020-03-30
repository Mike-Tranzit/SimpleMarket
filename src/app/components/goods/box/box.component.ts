import { Component, OnInit } from '@angular/core';
import { Product } from '@models/interfaces/goods.interface';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  public shoppingCard = [];
  constructor() { }

  ngOnInit(): void {
  }

  add(item: Product): void | never {
      const productIsAvailable = item.availableCount > 0;
      if (!productIsAvailable) return;

      /*const itemIsNew = typeof this.shoppingCard[item.goodsId] === 'undefined';
      if (itemIsNew) {
        this.shoppingCard[item.goodsId] = Object.assign({}, item);
      } else {
        this.shoppingCard[item.goodsId].availableCount++;
      }
      item.availableCount--;
      console.log(this.shoppingCard);*/
  }

  get shoppingCardIsEmpty(): boolean {
    return this.shoppingCard.length > 0;
  }
}
