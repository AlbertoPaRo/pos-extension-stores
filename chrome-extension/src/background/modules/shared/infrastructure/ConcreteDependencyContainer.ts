import { EddressUserRepository } from '../../EddressUser/domain/EddressUserRepository';
import { FetchEddressUserRepository } from '../../EddressUser/infrastructure/FetchEddressUserRepository';
import { TokenService } from '../application/TokenService';
import { type DecodedToken } from '../domain/DecodedToken';
import { DependencyContainer } from '../domain/DependencyContainer';
import { DependencyContainerFactory } from '../domain/DependencyContainerFactory';
import { type DependencyTypesMap } from '../domain/DependencyTypesMap';
import { type TokenDecoder } from '../domain/TokenDecoder';
import { type TokenRepository } from '../domain/TokenRepository';
import { JwtTokenDecoder } from './JwtTokenDecoder';
import { QueryParamsTokenRepository } from './QueryParamsTokenRepository';

export enum DependencyTypes {
  TokenRepository = 'TokenRepository',
  TokenDecoder = 'TokenDecoder',
  TokenService = 'TokenService',
  EddressUserRepository = 'EddressUserRepository',
}

export interface ConcreteDependencyTypesMap extends DependencyTypesMap {
  [DependencyTypes.TokenRepository]: TokenRepository;
  [DependencyTypes.TokenDecoder]: TokenDecoder<DecodedToken>;
  [DependencyTypes.TokenService]: TokenService;
  [DependencyTypes.EddressUserRepository]: EddressUserRepository;
}

export class ConcreteDependencyContainerFactory extends DependencyContainerFactory<ConcreteDependencyTypesMap> {
  createContainer(): DependencyContainer<ConcreteDependencyTypesMap> {
    const dependencyContainer = new DependencyContainer<ConcreteDependencyTypesMap>();
    const tokenRepository = new QueryParamsTokenRepository();
    const tokenDecoder = new JwtTokenDecoder<DecodedToken>();
    const tokenService = new TokenService(tokenDecoder, tokenRepository);
    const eddressUserRepository = new FetchEddressUserRepository(tokenService);

    dependencyContainer.register(DependencyTypes.EddressUserRepository, eddressUserRepository);
    dependencyContainer.register(DependencyTypes.TokenRepository, tokenRepository);
    dependencyContainer.register(DependencyTypes.TokenDecoder, tokenDecoder);
    dependencyContainer.register(DependencyTypes.TokenService, tokenService);
    return dependencyContainer;
  }
}
