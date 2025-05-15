import { EddressUserRepository } from '../../domain/EddressUserRepository';
import { User } from '../../domain/interfaces/User';

export class EddressUserFindBySearchQuery {
  #eddressUserRepository: EddressUserRepository;
  constructor(eddressUserRepository: EddressUserRepository) {
    this.#eddressUserRepository = eddressUserRepository;
  }

  async find(searchQuery: string): Promise<User[] | undefined> {
    const users = await this.#eddressUserRepository.findUsersBySearchQuery(searchQuery);
    return users;
  }
}
