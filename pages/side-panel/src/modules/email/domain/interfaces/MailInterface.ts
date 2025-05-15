interface MailData {
  name: string;
  phone: string;
  email: string;
  country: string;
  password: string;
}

export interface MailInterface {
  to: string;
  data: MailData;
}
