import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDirective } from './price.directive';
import { PriceTestComponent } from '@tests/components/price-test/price-test.component';
import { PriceFieldColors } from '@models/enums/price-color.enum';
import { By } from '@angular/platform-browser';




describe('PriceDirective', () => {
  let fixture: ComponentFixture<PriceTestComponent>;
  let comp: PriceTestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PriceDirective,
        PriceTestComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PriceTestComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should create an instance', () => {
    const directive = new PriceDirective();
    expect(directive).toBeTruthy();
  });

  it('should change color of background to green', () => {
    const payload = {
      price: 100,
      previousPrice: 90
    };
    changeParamsAndExpect(payload, PriceFieldColors.UP);
  });

  it('should change color of background to red', () => {
    const payload = {
      price: 90,
      previousPrice: 100
    };
    changeParamsAndExpect(payload, PriceFieldColors.DOWN);
  });

  function changeParamsAndExpect({price, previousPrice}, expectedColor) {
    comp.price = price;
    comp.previousPrice = previousPrice;
    fixture.detectChanges();

    const el = fixture.debugElement.queryAll(By.directive(PriceDirective));
    const div = el[0].nativeElement;

    expect(div.style.backgroundColor).toBe(expectedColor);
  }
});
