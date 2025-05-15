import { StringValueObject } from '../../shared/domain/StringValueObject';
import { URLValueObject } from '../../shared/domain/URLValueObject';
import { BimsRepository } from '../domain/BimsRepository';
import { BimsContactParams } from '../domain/BimsContactParams';

export class FetchBimsUserRepository implements BimsRepository {
  private buildEndpoint() {
    const baseUrl = StringValueObject.create(process.env.CEB_BIMS_BASE_URL, 'Bims Endpoint Url');
    const endpointUrl = new URLValueObject(baseUrl.getValue(), `api/contacts`).getValue();
    return endpointUrl;
  }

  async findContact(uid: string, cookies: string): Promise<BimsContactParams | undefined> {
    try {
      const commerceUid = StringValueObject.create(uid, 'Bims Commerceuid');
      const baseUrl = this.buildEndpoint();
      const endpointUrl = `${baseUrl}/?id=${commerceUid.getValue()}`;
      const response = await globalThis.fetch(endpointUrl, {
        method: 'GET',
        headers: {
          Cookie: cookies,
        },
      });

      if (!response.ok) {
        throw new Error(JSON.stringify(await response.text()));
      }

      const userData = (await response.json()) as { data: { Contact: BimsContactParams }[] };
      if (!userData?.data?.length) {
        return undefined;
      }

      return userData.data[0].Contact;
    } catch (error) {
      console.error('Error fetching user:', error instanceof Error ? error.message : error);
      return undefined;
    }
  }
}
