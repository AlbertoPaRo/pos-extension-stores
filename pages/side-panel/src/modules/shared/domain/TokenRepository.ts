import type { TokenValue } from './TokenValue';

export interface TokenRepository {
  getToken: () => TokenValue | undefined;
  setToken(token?: string | null): void;
}
