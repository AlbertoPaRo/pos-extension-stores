import { FetchEddressUserRepository } from '../FetchEddressUserRepository';
import { EddressUserFinder } from '../../application/Find/EddressUserFinder';
import { TokenService } from '@src/background/modules/shared/application/TokenService';
import { JwtTokenDecoder } from '@src/background/modules/shared/infrastructure/JwtTokenDecoder';
import { DecodedToken } from '@src/background/modules/shared/domain/DecodedToken';
import { QueryParamsTokenRepository } from '@src/background/modules/shared/infrastructure/QueryParamsTokenRepository';

export async function getUserData(token?: string | null) {
  if (!token) return undefined;
  const tokenRepository = new QueryParamsTokenRepository();
  tokenRepository.setToken(token);
  const tokenDecoder = new JwtTokenDecoder<DecodedToken>();
  const tokenService = new TokenService(tokenDecoder, tokenRepository);
  const repository = new FetchEddressUserRepository(tokenService);
  const action = new EddressUserFinder(repository);
  const data = await action.run();
  return data;
}
