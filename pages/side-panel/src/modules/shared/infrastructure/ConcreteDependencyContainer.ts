import { TokenService } from '../application/TokenService';
import { type DecodedToken } from '../domain/DecodedToken';
import { DependencyContainer } from '../domain/DependencyContainer';
import { DependencyContainerFactory } from '../domain/DependencyContainerFactory';
import { type DependencyTypesMap } from '../domain/DependencyTypesMap';
import { type TokenDecoder } from '../domain/TokenDecoder';
import { type TokenRepository } from '../domain/TokenRepository';
import { JwtTokenDecoder } from './JwtTokenDecoder';
import { QueryParamsTokenRepository } from './QueryParamsTokenRepository';
import { FetchEddressUsers } from '@src/modules/EddressUser/infrastructure/FetchEddressUsers';
import { BimsUserRepository } from '@src/modules/BimsUser/domain/BimsUserReposiory';
import { EddressUserRepository } from '@src/modules/EddressUser/domain/EddressUserRepository';
import { HttpBimsUserData } from '@src/modules/BimsUser/infrastructure/HttpBimsUserData';
import { EmailRepository } from '@src/modules/email/domain/EmailRepository';
import { SendUsersData } from '@src/modules/email/infrastructure/SendUsersData';

export enum DependencyTypes {
  TokenRepository = 'TokenRepository',
  TokenDecoder = 'TokenDecoder',
  TokenService = 'TokenService',
  EddressUserRepository = 'EddressUserRepository',
  BimsUserReposiory = 'BimsUserRespository',
  EmailRepository = 'EmailRepository',
}

export interface ConcreteDependencyTypesMap extends DependencyTypesMap {
  [DependencyTypes.TokenRepository]: TokenRepository;
  [DependencyTypes.TokenDecoder]: TokenDecoder<DecodedToken>;
  [DependencyTypes.TokenService]: TokenService;
  [DependencyTypes.EddressUserRepository]: EddressUserRepository;
  [DependencyTypes.BimsUserReposiory]: BimsUserRepository;
  [DependencyTypes.EmailRepository]: EmailRepository;
}

export class ConcreteDependencyContainerFactory extends DependencyContainerFactory<ConcreteDependencyTypesMap> {
  createContainer(): DependencyContainer<ConcreteDependencyTypesMap> {
    const dependencyContainer = new DependencyContainer<ConcreteDependencyTypesMap>();
    const tokenRepository = new QueryParamsTokenRepository();
    const tokenDecoder = new JwtTokenDecoder<DecodedToken>();
    const tokenService = new TokenService(tokenDecoder, tokenRepository);
    const eddressUserRepository = new FetchEddressUsers(tokenService);
    const bimsUserRepository = new HttpBimsUserData(tokenService);
    const emailRepository = new SendUsersData();

    dependencyContainer.register(DependencyTypes.EddressUserRepository, eddressUserRepository);

    dependencyContainer.register(DependencyTypes.TokenRepository, tokenRepository);
    dependencyContainer.register(DependencyTypes.TokenDecoder, tokenDecoder);
    dependencyContainer.register(DependencyTypes.TokenService, tokenService);
    dependencyContainer.register(DependencyTypes.EddressUserRepository, eddressUserRepository);
    dependencyContainer.register(DependencyTypes.BimsUserReposiory, bimsUserRepository);
    dependencyContainer.register(DependencyTypes.EmailRepository, emailRepository);
    return dependencyContainer;
  }
}
