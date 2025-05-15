import { UserData } from './interfaces/userData';

export interface BimsUserRepository {
  updateUserCode(country: string, userData: UserData): Promise<any | undefined>;
}
