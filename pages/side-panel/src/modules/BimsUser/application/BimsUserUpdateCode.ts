import { BimsUserRepository } from '../domain/BimsUserReposiory';
import { UserData } from '../domain/interfaces/userData';

export class BimsUserUpdateCode {
  #bimsUserRepository: BimsUserRepository;
  constructor(bimsUserRepository: BimsUserRepository) {
    this.#bimsUserRepository = bimsUserRepository;
  }

  async update(country: string, userData: UserData): Promise<any | undefined> {
    const users = await this.#bimsUserRepository.updateUserCode(country, userData);
    return users;
  }
}
