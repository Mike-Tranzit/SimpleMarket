import {Directive, Input, SimpleChange, OnInit, OnChanges} from '@angular/core';

@Directive({
  selector: '[appPrice]'
})
export class PriceDirective implements OnInit, OnChanges{
  @Input('appPrice') appPrice: any;
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (changes.appPrice != null) {
     // console.log(changes.appPrice);
    }
  }
}
