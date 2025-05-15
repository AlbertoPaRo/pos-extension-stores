import { CookiesExtractor } from '../../../shared/infrastructure/CookiesExtractor';
import { FetchBimsUserRepository } from '../../infrastructure/FetchBimsUserRepository';

export class FetchBimsUserFinder {
  constructor(private readonly repository: FetchBimsUserRepository) {}

  async run(uid: string) {
    if (!uid) {
      console.error('❌ No se recibió un UID válido.');
      return null;
    }

    const cookies = await CookiesExtractor.getCookies('https://bims.app');
    if (!cookies) {
      console.error('❌ No se pudieron obtener las cookies.');
      return null;
    }

    return await this.repository.findContact(uid, cookies);
  }
}
