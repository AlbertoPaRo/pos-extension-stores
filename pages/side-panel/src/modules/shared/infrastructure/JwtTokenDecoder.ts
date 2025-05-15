import { jwtDecode } from 'jwt-decode';
import { type TokenDecoder } from '../domain/TokenDecoder';

export class JwtTokenDecoder<T> implements TokenDecoder<T> {
  decodeToken(jwtToken: string | null): T | null {
    try {
      if (!jwtToken) return null;
      const decoded: T = jwtDecode(jwtToken);

      return decoded;
    } catch (error) {
      return null;
    }
  }
}
