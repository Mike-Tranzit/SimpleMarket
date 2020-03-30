export interface CategoriesInterface {
  [key: string]: ICategory[];
}

export interface ICategory {
  'G': number;
  'B': {
    [key: string]: {
      'N': string;
      'T': number;
    }
  };
}
