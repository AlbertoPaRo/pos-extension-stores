export interface App {
  os: string;
  channel: string;
  osVersion: null | string;
  authToken: null | string;
  authTokenVersion: number;
  appVersionCode: null | string;
}
