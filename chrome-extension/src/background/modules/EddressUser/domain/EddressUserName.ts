import { type ValueObject } from '@/modules/shared/domain/ValueObject';

export class EddressUserName implements ValueObject<string> {
  constructor(private readonly value: string) {}
  getValue(): string {
    return this.value;
  }
}
