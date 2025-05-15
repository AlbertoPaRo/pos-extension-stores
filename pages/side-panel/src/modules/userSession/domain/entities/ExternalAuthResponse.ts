export interface ExternalAuthResponse {
  uid: string;
  jwtToken: string;
  message: string;
  errorCode: number;
  fullName: string;
  email: string;
  idUser: number;
}
