import { type TokenRepository } from '../domain/TokenRepository';
import { TokenValue } from '../domain/TokenValue';
import { cookies as nextCookies } from 'next/headers';

export class CookiesTokenRepository implements TokenRepository {
  #token?: TokenValue;
  constructor(private readonly key: string) {}

  setToken(token: string) {
    this.#token = new TokenValue(token);
  }

  getToken(): TokenValue | undefined {
    'use server';
    const token = nextCookies().get(this.key)?.value;
    this.#token = new TokenValue(token);
    return this.#token;
  }
}
