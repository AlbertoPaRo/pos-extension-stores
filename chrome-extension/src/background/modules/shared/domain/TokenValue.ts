import { StringValueObject } from './StringValueObject';
import { type ValueObject } from './ValueObject';

export class TokenValue implements ValueObject<string> {
  #value: StringValueObject;
  constructor(value?: string) {
    this.#value = StringValueObject.create(value, 'Token Value');
  }

  getValue() {
    return this.#value.getValue();
  }
}
