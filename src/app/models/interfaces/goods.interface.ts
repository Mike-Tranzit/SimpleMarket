export interface GoodsWrapper {
    Goods: GoodsBase[];
}

export interface GoodsBase {
  'B': boolean;
  'C': number;
  'CV': any;
  'G': number;
  'P': number;
  'Pl': any;
  'T': number;
}

export interface GoodsToView {
  [key: string]: Product[];
}

export interface Product {
    price: number;
    goodsId: number;
    availableCount: number;
    goodsName: string;
}

export interface GoodsPricesBuffer {
  [key: number]: number;
}

export interface SortGoodsToView {
  actualData: GoodsToView[];
  cloneGoodsPricesBuffer: GoodsPricesBuffer;
}
