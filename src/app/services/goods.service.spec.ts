import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GoodsService } from './goods.service';
import { goodsMock } from '@tests/mocks/goods';
import { NAMES } from '@services/api';
import { of } from 'rxjs';

describe('GoodsService', () => {
  let service: GoodsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoodsService]
    });
    service = TestBed.inject(GoodsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    service.loadCategories();
    const req = httpTestingController.expectOne(NAMES);
    expect(req.request.method).toBe('GET');
  });

  it('should return the mocked data in the subscribe', () => {
    const spy = spyOn(service, 'loadGoods').and.returnValue(
      of(goodsMock)
    );

    service.loadGoods().subscribe(data => {
      expect(data.length).toBe(1);
    });

    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => httpTestingController.verify());
});
