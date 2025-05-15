import { TokenService } from '@src/modules/shared/application/TokenService';
import { StringValueObject } from '@src/modules/shared/domain/StringValueObject';
import { URLValueObject } from '@src/modules/shared/domain/URLValueObject';
import { BimsUserRepository } from '../domain/BimsUserReposiory';

export class HttpBimsUserData implements BimsUserRepository {
  private buildEndPoint() {
    const baseUrl = StringValueObject.create(process.env.CEB_BIMS_SERVICE_URL, 'Bims Endpoint Url');
    const endpointUrl = new URLValueObject(baseUrl.getValue(), `/bims/contacts`).getValue();
    return endpointUrl;
  }

  #tokenService: TokenService;
  constructor(tokenService: TokenService) {
    this.#tokenService = tokenService;
  }

  async updateUserCode(country: string, userData: any): Promise<any | undefined> {
    const parsedOrderData = {
      id: userData.id,
      name: userData.name,
      document_id: userData.documentId,
      code: userData.uid,
    };
    try {
      const token = await this.#tokenService.getToken();
      if (!token) throw new Error('Token must be provided');
      const endpointUrl = `${this.buildEndPoint()}?country=${country}`;
      const response = await globalThis.fetch(endpointUrl, {
        method: 'POST',
        body: JSON.stringify(parsedOrderData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const data = await response.json();
      return data.list;
    } catch (error) {
      console.error('Error fetching users:', error instanceof Error ? error.message : error);
      return undefined;
    }
  }
}
