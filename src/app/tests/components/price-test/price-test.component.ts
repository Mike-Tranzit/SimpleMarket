import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-test',
  templateUrl: './price-test.component.html',
  styleUrls: ['./price-test.component.scss']
})
export class PriceTestComponent implements OnInit {
  public price: number;
  public previousPrice: number;

  constructor() { }

  ngOnInit(): void {
  }

}
