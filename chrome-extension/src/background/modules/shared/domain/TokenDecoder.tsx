export interface TokenDecoder<T> {
  decodeToken(jwtToken: string): T | null;
}
