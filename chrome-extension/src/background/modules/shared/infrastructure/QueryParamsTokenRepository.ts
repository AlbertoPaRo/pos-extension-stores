import { type TokenRepository } from '../domain/TokenRepository';
import { TokenValue } from '../domain/TokenValue';

export class QueryParamsTokenRepository implements TokenRepository {
  #token?: TokenValue;
  constructor(value?: string) {
    if (value) {
      this.#token = new TokenValue(value);
    }
  }

  setToken(token?: string | null | undefined): void {
    if (token) {
      this.#token = new TokenValue(token);
    }
  }

  getToken(): TokenValue | undefined {
    return this.#token;
  }
}
