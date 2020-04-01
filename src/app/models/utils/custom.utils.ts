export const randomIntegerGenerator = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
