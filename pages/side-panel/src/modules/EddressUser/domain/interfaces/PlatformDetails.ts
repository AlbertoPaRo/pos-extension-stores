export interface PlatformDetails {
  os: string;
  channel: string;
  osVersion: string | null;
  authToken: string | null;
  authTokenVersion: number;
  appVersionCode: number | null;
}
