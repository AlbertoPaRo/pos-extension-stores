import { StringValueObject } from '../domain/StringValueObject';
import { type TokenRepository } from '../domain/TokenRepository';
import { TokenValue } from '../domain/TokenValue';

export class EnviromentTokenRepository implements TokenRepository {
  #token?: TokenValue;

  private retrieveEnvToken(): TokenValue | undefined {
    const token = process.env.CEB_EDDRESS_BEARER_TOKEN;
    if (!token) return undefined;

    return new TokenValue(StringValueObject.create(token, 'Eddress Bearer Token').getValue());
  }

  setToken(token: string) {
    this.#token = new TokenValue(token);
  }

  getToken(): TokenValue | undefined {
    if (!this.#token) {
      this.#token = this.retrieveEnvToken();
    }
    return this.#token;
  }
}
