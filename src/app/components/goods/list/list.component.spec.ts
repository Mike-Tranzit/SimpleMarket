import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from './list.component';
import { BoxComponent } from '../box/box.component';
import { GoodsService } from '@services/goods.service';
import { goodsMock } from '@tests/mocks/goods';
import { ProductCountActionEnum } from '@models/enums/product-count-action.enum';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const goodsServiceSpy = jasmine.createSpyObj('GoodsService', {
    startGoodsPolling: of([goodsMock])
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, BoxComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: GoodsService, useValue: goodsServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('categories were loaded', () => {
    expect(component.listOfProductsData.length).toBeGreaterThan(0);
  });

  it('should call updateCountOfProduct', () => {
    spyOn(component, 'updateCountOfProduct');
    const testPayload = {
      goodsId: 1,
      groupName: 'Книги',
      count: 1,
      action: ProductCountActionEnum.INCREASE
    };
    component.updateCountOfProduct(testPayload);
    expect(component.updateCountOfProduct).toHaveBeenCalled();
  });

});
