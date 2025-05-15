import { StringValueObject } from '@src/modules/shared/domain/StringValueObject';

function getEnvValue(key: string, label: string): string {
  const value = process.env[key];
  return StringValueObject.create(value, label).getValue();
}

export const ENV = {
  firebaseAuthUrl: getEnvValue('CEB_FIREBASE_AUTH_URL', 'Firebase Auth Url'),
  firebaseApiKey: getEnvValue('CEB_FIREBASE_API_KEY', 'Firebase Api Key'),
  eddressBaseUrl: getEnvValue('CEB_EDDRESS_BASE_URL', 'Eddress Base Url'),
  appName: getEnvValue('CEB_APP_NAME', 'App Name'),
  appIdentifier: getEnvValue('CEB_APP_NAME', 'App Identifier'),
};
