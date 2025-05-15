import { type DecodedToken } from '../domain/DecodedToken';
import { type TokenDecoder } from '../domain/TokenDecoder';
import { type TokenRepository } from '../domain/TokenRepository';

export class TokenService {
  constructor(
    private readonly decoder: TokenDecoder<DecodedToken>,
    private tokenRepository?: TokenRepository,
  ) {}

  setTokenRepository(tokenRepository?: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async decode() {
    if (!this.tokenRepository) throw new Error('TokenRepository not implemented.');
    const token = await this.tokenRepository.getToken();
    if (!token) return undefined;
    return this.decoder.decodeToken(token.getValue());
  }

  async getToken() {
    if (!this.tokenRepository) throw new Error('TokenRepository not implemented.');
    return await this.tokenRepository.getToken();
  }
}
