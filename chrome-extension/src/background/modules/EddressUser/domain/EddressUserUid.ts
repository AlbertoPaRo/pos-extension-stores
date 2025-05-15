import { StringValueObject } from '@/modules/shared/domain/StringValueObject';
import { type ValueObject } from '@/modules/shared/domain/ValueObject';

export class EddressUserUid implements ValueObject<string> {
  #value: string;
  constructor(value?: string) {
    this.#value = StringValueObject.create(value, 'EddressUserUid').getValue();
  }

  getValue(): string {
    return this.#value;
  }
}
