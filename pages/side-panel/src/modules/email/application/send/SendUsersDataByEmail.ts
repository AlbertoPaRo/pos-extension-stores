import { EmailRepository } from '../../domain/EmailRepository';
import { MailInterface } from '../../domain/interfaces/MailInterface';

export class SendUsersDataByEmail {
  #EmailRepository: EmailRepository;
  constructor(EmailRepository: EmailRepository) {
    this.#EmailRepository = EmailRepository;
  }

  async send(data: MailInterface): Promise<any> {
    const response = await this.#EmailRepository.sendMail(data);
    return response;
  }
}
