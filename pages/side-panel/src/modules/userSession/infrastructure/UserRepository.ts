import { env } from 'node:process';
import { ExternalAuthResponse } from '../domain/entities/ExternalAuthResponse';
import { IUserRepository } from '../domain/repositories/IUserRepostory';
import { ENV } from './config/env';
import { URLValueObject } from '@src/modules/shared/domain/URLValueObject';

export class UserRepository implements IUserRepository {
  private buildEndPoint() {
    const endpointUrl = new URLValueObject(ENV.eddressBaseUrl, `api/market/`).getValue();
    return endpointUrl;
  }

  async register(email: string, password: string): Promise<string> {
    try {
      const response = await fetch(`${ENV.firebaseAuthUrl}:signUp?key=${ENV.firebaseApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': 'Chrome/JsCore/9.10.0/FirebaseCore-web',
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en registro Firebase: ${errorData.error?.message || 'Error desconocido'}`);
      }

      const data = await response.json();
      return data.idToken;
    } catch (error) {
      console.error('Error en registro de usuario:', error);
      throw error;
    }
  }

  async getUserDetails(token: string): Promise<any> {
    try {
      const response = await fetch(`${ENV.firebaseAuthUrl}:lookup?key=${ENV.firebaseApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': 'Chrome/JsCore/9.10.0/FirebaseCore-web',
        },
        body: JSON.stringify({ idToken: token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error obteniendo detalles: ${errorData.error?.message || 'Error desconocido'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo detalles del usuario:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, token: string, displayName: string): Promise<void> {
    try {
      const response = await fetch(`${ENV.firebaseAuthUrl}:update?key=${ENV.firebaseApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': 'Chrome/JsCore/9.10.0/FirebaseCore-web',
        },
        body: JSON.stringify({ idToken: token, displayName, returnSecureToken: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error actualizando perfil: ${errorData.error?.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error actualizando perfil de usuario:', error);
      throw error;
    }
  }

  async registerInExternalSystem(authUid: string, email: string, fullName: string): Promise<ExternalAuthResponse> {
    try {
      const response = await fetch(`${this.buildEndPoint()}app/public/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appName: ENV.appName,
          appIdentifier: ENV.appIdentifier,
          authProvider: 'password',
          authUid,
          email,
          fullName,
          os: 'WEB',
          locale: 'es',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en registro externo: ${errorData.error?.message || 'Error desconocido'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en registro de sistema externo:', error);
      throw error;
    }
  }

  async updateUserPhoneNumber(
    uid: string,
    token: string,
    fullName: string,
    email: string,
    phoneNumber: string,
  ): Promise<void> {
    try {
      const updateUrl = `${this.buildEndPoint()}web/users/${uid}`;

      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          userName: null,
          locale: 'es',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error actualizando teléfono: ${errorData.error?.message || 'Error desconocido'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error actualizando número telefónico:', error);
      throw error;
    }
  }
}
