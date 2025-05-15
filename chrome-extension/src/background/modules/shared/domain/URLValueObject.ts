import { StringValueObject } from './StringValueObject';
import type { ValueObject } from './ValueObject';

export class URLValueObject implements ValueObject<string> {
  private readonly urlObject: URL;
  #value: string;
  constructor(value?: string, pathname?: string) {
    const url = this.ensureValueIsDefined(value);
    try {
      const urlValue = new URL(url);
      if (pathname) {
        urlValue.pathname = pathname;
      }
      this.urlObject = urlValue;
      this.#value = urlValue.toString();
    } catch (error) {
      throw new Error('Invalid URL');
    }
  }

  getValue(): string {
    return this.urlObject.toString();
  }

  private ensureValueIsDefined(value: string | null | undefined) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new Error('Value must be a defined URL');
    }
    return value;
  }

  addPathnameSegment(segment: string) {
    const pathnameArr = this.urlObject.pathname.split('/').filter(item => item.trim());
    pathnameArr.push(segment);
    this.urlObject.pathname = pathnameArr.join('/');
  }

  addSearchParams(params: Record<string, string>): void {
    const urlSearchParams = new URLSearchParams(this.urlObject.search);

    for (const [key, value] of Object.entries(params)) {
      urlSearchParams.set(key, value);
    }

    this.urlObject.search = urlSearchParams.toString();
  }

  static create(value?: string | null, message?: string, pathname?: string) {
    const stringValue = StringValueObject.create(value, message);
    return new URLValueObject(stringValue.getValue(), pathname);
  }
}
