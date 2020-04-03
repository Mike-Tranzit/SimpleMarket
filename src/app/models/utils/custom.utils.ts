export const randomIntegerGenerator = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
  return obj[key];
}

export function findElement<T>(elements: T[], cb: any): T {
  return elements.find(cb);
}

export function findCb(itemForComparison, field) {
  return (item: any) => item[field] === itemForComparison[field];
}
