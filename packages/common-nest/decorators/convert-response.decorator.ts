import { plainToInstance } from 'class-transformer';

import { BaseResponse } from '../base';

export function ConvertResponse(response: typeof BaseResponse) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      return plainToInstance(response, result);
    };

    return descriptor;
  };
}
