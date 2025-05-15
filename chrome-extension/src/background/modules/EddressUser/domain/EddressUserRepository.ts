import { type EddressUserParams } from './EddressUserParams';

export interface EddressUserRepository {
  find(uid: string): Promise<EddressUserParams | undefined>;
}
