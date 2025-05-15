import { MailInterface } from './interfaces/MailInterface';

export interface EmailRepository {
  sendMail(data: MailInterface): Promise<any>;
}
