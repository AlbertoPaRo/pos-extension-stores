import { RegisterUserUseCase } from '@src/modules/userSession/domain/RegsterUserUseCase';
import { generateStrongPassword } from '../../utils/passwordGenerator';
import { UserRegisterDto, UserResponseDto } from '../dtos/UserDto';
import { User } from '@src/modules/userSession/domain/entities/User';

export class UserService {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async registerUser(userDto: UserRegisterDto): Promise<UserResponseDto> {
    try {
      const generatedPassword = generateStrongPassword();

      const user: User = {
        name: userDto.name,
        phone: userDto.phone,
        email: userDto.email,
      };

      const result = await this.registerUserUseCase.execute(user, generatedPassword);

      return {
        success: result.success,
        message: 'Usuario registrado correctamente',
        userId: result.userId,
        generatedPassword: generatedPassword,
        user: result.userDataUpdated,
      };
    } catch (error) {
      console.error('Error en servicio de registro:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido al registrar usuario',
      };
    }
  }
}
