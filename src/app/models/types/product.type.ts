import { Product } from '@models/interfaces/goods.interface';

export type ProductInBox = Pick<Product, 'price' | 'goodsId' | 'goodsName'> & { count: number | string, groupName: string };
export type UpdateProductPayload = Pick<ProductInBox, 'goodsId' | 'groupName' | 'count'> & { action: string };
