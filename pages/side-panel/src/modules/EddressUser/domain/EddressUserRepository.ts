import { User } from './interfaces/User';

export interface EddressUserRepository {
  findUsersBySearchQuery(searchQuery: string): Promise<User[] | undefined>;
}
