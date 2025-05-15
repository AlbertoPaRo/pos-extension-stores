import { ExternalAuthResponse } from '../entities/ExternalAuthResponse';

export interface IUserRepository {
  register(email: string, password: string): Promise<string>;
  updateUserProfile(userId: string, token: string, displayName: string): Promise<void>;
  getUserDetails(token: string): Promise<any>;
  registerInExternalSystem(authUid: string, email: string, fullName: string): Promise<ExternalAuthResponse>;
  updateUserPhoneNumber(
    uid: string,
    token: string,
    fullName: string,
    email: string,
    phoneNumber: string,
  ): Promise<void>;
}
