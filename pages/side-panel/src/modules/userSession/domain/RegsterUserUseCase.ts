import { User } from './entities/User';
import { IUserRepository } from './repositories/IUserRepostory';

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    user: User,
    password: string,
  ): Promise<{ success: boolean; userId?: string; user: User; userDataUpdated: any }> {
    try {
      const authToken = await this.userRepository.register(user.email, password);

      const userDetails = await this.userRepository.getUserDetails(authToken);
      const userId = userDetails.users[0].localId;

      await this.userRepository.updateUserProfile(userId, authToken, user.name);

      const externalAuthResponse = await this.userRepository.registerInExternalSystem(userId, user.email, user.name);

      const userDataUpdated = await this.userRepository.updateUserPhoneNumber(
        externalAuthResponse.uid,
        externalAuthResponse.jwtToken,
        user.name,
        user.email,
        user.phone,
      );

      return { success: true, userId, user, userDataUpdated };
    } catch (error) {
      console.error('Error en RegisterUserUseCase:', error);
      throw error;
    }
  }
}
