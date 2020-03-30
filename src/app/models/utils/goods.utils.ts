import { GoodsToView } from '@models/interfaces/goods.interface';

export const fixedExchangeRate = (price, exchangeRate, fractionDigits = 1) => +(price * exchangeRate).toFixed(fractionDigits);

export function sortGoodsWithCategories({goodsData, categories, exchangeRate}): GoodsToView[]  {
  const goods = [];
  for (const item of goodsData) {

    const {C: price, T: goodsId, G: categoryId, P: availableCount} = item;
    const {G: categoryName, B: listOfGoods} = categories.findById(categoryId);
    const goodsName =  listOfGoods[goodsId]['N'];

    goods[categoryName] = goods[categoryName] || [];

    goods[categoryName].push({
      price: fixedExchangeRate(price, exchangeRate),
      goodsId,
      categoryId,
      availableCount,
      goodsName
    });
  }
  console.log(goods);
  return goods;
}
