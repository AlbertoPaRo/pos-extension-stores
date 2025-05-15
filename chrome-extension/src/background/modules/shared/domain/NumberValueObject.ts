import type { ValueObject } from './ValueObject';

export class NumberValueObject implements ValueObject<number> {
  #value: number;
  constructor(value?: number | null | string) {
    this.#value = this.ensureValueIsDefined(value);
  }

  getValue(): number {
    return Number(this.#value);
  }

  static create(value?: number | null | string, message?: string) {
    try {
      return new NumberValueObject(value);
    } catch {
      if (message) {
        throw new Error(`${message} must be defined and numeric`);
      } else {
        throw new Error('Value must be defined and numeric');
      }
    }
  }

  private ensureValueIsDefined(value: number | null | string | undefined) {
    if (value === null || value === undefined || isNaN(Number(value))) {
      throw new Error('Value must be defined and numeric');
    }

    return Number(value);
  }
}
