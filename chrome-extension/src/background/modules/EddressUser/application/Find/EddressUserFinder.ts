import { type EddressUserRepository } from '../../domain/EddressUserRepository';
import { type EddressUserParams } from '../../domain/EddressUserParams';

export class EddressUserFinder {
  constructor(private readonly repository: EddressUserRepository) {}

  async run(uid: string): Promise<EddressUserParams | undefined> {
    const userData = await this.repository.find(uid);
    return userData;
  }
}
