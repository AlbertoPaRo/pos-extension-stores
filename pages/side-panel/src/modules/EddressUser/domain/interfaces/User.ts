import { Platforms } from './Platforms';

export interface User {
  id: string;
  uid: string;
  lastOrderDate: null;
  createdOn: number;
  totalOrders: number;
  additionalPhoneNumbers: null;
  userName: null;
  email: string;
  phoneNumber: string;
  fullName: string;
  name: null;
  legacyId: null;
  authProvider: string;
  timeZone: string;
  userVerificationData: null;
  walletAmount: null;
  locale: null;
  platforms: Platforms;
  isBlocked: boolean;
  customerGroupId: null;
  businessInfo: null;
  userOs: string;
  appVersionCode: null;
}
