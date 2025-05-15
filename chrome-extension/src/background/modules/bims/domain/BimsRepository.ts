import { BimsContactParams } from './BimsContactParams';

export interface BimsRepository {
  findContact(uid: string, cookies: string): Promise<BimsContactParams | undefined>;
}
