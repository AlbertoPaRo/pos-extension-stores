import { StringValueObject } from '@src/modules/shared/domain/StringValueObject';
import { URLValueObject } from '@src/modules/shared/domain/URLValueObject';
import { EmailRepository } from '../domain/EmailRepository';
import { MailInterface } from '../domain/interfaces/MailInterface';

export class SendUsersData implements EmailRepository {
  private buildEndPoint() {
    const baseUrl = StringValueObject.create(process.env.CEB_BIMS_SERVICE_URL, 'Bims Endpoint Url');
    const endpointUrl = new URLValueObject(baseUrl.getValue(), `email/send-template`).getValue();
    return endpointUrl;
  }

  async sendMail(userData: MailInterface): Promise<any | undefined> {
    try {
      const endpointUrl = `${this.buildEndPoint()}`;
      const response = await globalThis.fetch(endpointUrl, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error instanceof Error ? error.message : error);
      return undefined;
    }
  }
}
