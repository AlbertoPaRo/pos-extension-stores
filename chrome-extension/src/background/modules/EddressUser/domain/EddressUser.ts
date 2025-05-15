import { type EddressUserParams } from './EddressUserParams';
import { EddressUserPhoneNumber } from './EddressUserPhoneNumber';
import { EddressUserEmail } from './EddressUserEmail';
import { EddressUserUid } from './EddressUserUid';
import { EddressUserName } from './EddressUserName';

export class EddressUser {
  userUid: EddressUserUid;
  phoneNumber: EddressUserPhoneNumber;
  email: EddressUserEmail;
  name: EddressUserName;
  constructor(params: EddressUserParams) {
    this.userUid = new EddressUserUid(params.userUid);
    this.phoneNumber = new EddressUserPhoneNumber(params.phoneNumber);
    this.email = new EddressUserEmail(params.email);
    this.name = new EddressUserName(params.name);
  }

  serialize() {
    return {
      userUid: this.userUid.getValue(),
      phoneNumber: this.phoneNumber.getValue(),
      email: this.email.getValue(),
      name: this.name.getValue(),
    };
  }
}
