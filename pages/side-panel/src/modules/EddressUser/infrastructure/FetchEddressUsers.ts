import { TokenService } from '@src/modules/shared/application/TokenService';
import { StringValueObject } from '@src/modules/shared/domain/StringValueObject';
import { URLValueObject } from '@src/modules/shared/domain/URLValueObject';
import { UserSearchResponse } from '../domain/interfaces/UserSearchResponse';
import { User } from '../domain/interfaces/User';
import { EddressUserRepository } from '../domain/EddressUserRepository';

export class FetchEddressUsers implements EddressUserRepository {
  private buildEndPoint() {
    const baseUrl = StringValueObject.create(process.env.CEB_EDDRESS_BASE_URL, 'Bims Endpoint Url');
    const endpointUrl = new URLValueObject(baseUrl.getValue(), `/api/v1/marketplace`).getValue();
    return endpointUrl;
  }

  #tokenService: TokenService;
  constructor(tokenService: TokenService) {
    this.#tokenService = tokenService;
  }

  async findUsersBySearchQuery(searchQuery: string): Promise<User[] | undefined> {
    try {
      const token = await this.#tokenService.getToken();
      if (!token) throw new Error('Token must be provided');
      const endpointUrl = `${this.buildEndPoint()}/users?pageNumber=1&recordsPerPage=35&searchString=${searchQuery}`;
      const response = await globalThis.fetch(endpointUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.getValue()}`,
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const data = (await response.json()) as UserSearchResponse;
      return data.list;
    } catch (error) {
      console.error('Error fetching users:', error instanceof Error ? error.message : error);
      return undefined;
    }
  }
}
