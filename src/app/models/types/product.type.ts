import { Product } from '@models/interfaces/goods.interface';

export type ProductInBox = Pick<Product, 'price' | 'goodsId' | 'goodsName'> & { count: number, groupName: string };
