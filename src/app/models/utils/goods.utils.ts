import { SortGoodsToView } from '@models/interfaces/goods.interface';

export const fixedExchangeRate = (price, exchangeRate, fractionDigits = 1) => +(price * exchangeRate).toFixed(fractionDigits);

export function sortGoodsWithCategories({goodsData, categories, exchangeRate, goodsPricesBuffer}): SortGoodsToView {
  const actualData = [];
  const cloneGoodsPricesBuffer = {...goodsPricesBuffer};

  for (const item of goodsData) {

    const {C: price, T: goodsId, G: categoryId, P: availableCount} = item;
    const {G: categoryName, B: listOfGoods} = categories.findById(categoryId);
    const goodsName =  listOfGoods[goodsId]['N'];

    actualData[categoryName] = actualData[categoryName] || [];

    const previousPrice = cloneGoodsPricesBuffer[goodsId];
    cloneGoodsPricesBuffer[goodsId] = fixedExchangeRate(price, exchangeRate);

    actualData[categoryName].push({
      price: fixedExchangeRate(price, exchangeRate),
      previousPrice,
      goodsId,
      categoryId,
      availableCount,
      goodsName
    });
  }
  return {
    actualData,
    cloneGoodsPricesBuffer
  };
}

export class
