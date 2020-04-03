import {ProductInBox} from '@models/types/product.type';

export function inputValueNotNull( target: object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
  const method = propertyDescriptor.value;
  propertyDescriptor.value = function(event: KeyboardEvent, productInBox: ProductInBox): void | unknown {
    const element = (event.target as HTMLInputElement);
    const value = +element.value;
    if (Number.isNaN(value) || value === productInBox.count) {
      const newElementValue = element.value === '' ? element.value : String(productInBox.count);
      element.value = newElementValue;
      return;
    }
    method.apply(this, [element, productInBox]);
  };
  return propertyDescriptor;
}
