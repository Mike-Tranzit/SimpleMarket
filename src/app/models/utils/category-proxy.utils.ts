export const CategoriesActionsHandler = new Proxy(Array, {
  construct(target: ArrayConstructor, argArray: any): object {
    const cache = {};
    return new Proxy(new target(...argArray), {
      get(arr, prop) {
        const targetArray = arr[0];
        switch (prop) {
          case 'findById': {
            return id => {
              const newCacheElement = typeof cache[id] === 'undefined';
              if (newCacheElement) {
                cache[id] = targetArray[id];
              }
              return cache[id];
            };
            break;
          }
          default: {
            return targetArray[prop];
          }
        }
      }
    });
  }
});
