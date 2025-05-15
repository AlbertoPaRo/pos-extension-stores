import type { ValueObject } from './ValueObject';

export class StringValueObject implements ValueObject<string> {
  #value: string;
  constructor(value: string | null | undefined) {
    this.#value = this.ensureValueIsDefined(value);
  }

  static create(value?: string | null | undefined, message?: string) {
    try {
      return new StringValueObject(value);
    } catch {
      if (message) {
        throw new Error(`${message} must be defined`);
      } else {
        throw new Error('Value must be defined');
      }
    }
  }

  getValue(): string {
    return this.#value;
  }

  private ensureValueIsDefined(value: string | null | undefined) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error('Value must be defined');
    }
    return value;
  }
}
