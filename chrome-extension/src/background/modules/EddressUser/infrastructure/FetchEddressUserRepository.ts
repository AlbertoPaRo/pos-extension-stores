import { type EddressUserRepository } from '../domain/EddressUserRepository';
import { type EddressUserParams } from '../domain/EddressUserParams';
import { StringValueObject } from '../../shared/domain/StringValueObject';
import { URLValueObject } from '../../shared/domain/URLValueObject';

export class FetchEddressUserRepository implements EddressUserRepository {
  private buildEndpoint() {
    const baseUrl = StringValueObject.create(process.env.CEB_EDDRESS_BASE_URL, 'Eddress Endpoint Url');
    const endpointUrl = new URLValueObject(baseUrl.getValue(), `/api/market/web/users`).getValue();
    return endpointUrl;
  }

  async find(uid: string): Promise<EddressUserParams | undefined> {
    try {
      const token = StringValueObject.create(process.env.CEB_EDDRESS_BEARER_TOKEN, 'Eddress Bearer token');
      const baseUrl = this.buildEndpoint();
      if (!token) throw new Error('Token must be provided');
      const commerceId = StringValueObject.create(uid, 'Commerce Id');
      const endpointUrl = `${baseUrl}/${commerceId.getValue()}`;
      const response = await globalThis.fetch(endpointUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.getValue()}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(JSON.stringify(await response.text()));
      }
      const userData: EddressUserParams = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user:', error instanceof Error ? error.message : error);
      return undefined;
    }
  }
}
