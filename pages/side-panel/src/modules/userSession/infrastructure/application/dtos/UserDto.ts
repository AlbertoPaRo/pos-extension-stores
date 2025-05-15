export interface EddressUser {
  tenantUid: string;
  locale: string;
  idUser: number;
  userUid: string;
  userId: string;
  uid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  editImage: boolean;
  createdOn: number;
  emailValidationSentDate: number;
  isAdmin: boolean;
}

export interface UserRegisterDto {
  name: string;
  phone: string;
  email: string;
}

export interface UserResponseDto {
  success: boolean;
  message: string;
  userId?: string;
  generatedPassword?: string;
  user?: EddressUser;
}
