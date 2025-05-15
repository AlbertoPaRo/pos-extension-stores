import { useMutation } from '@tanstack/react-query';
import { UserRegisterDto, UserResponseDto } from '@src/modules/userSession/infrastructure/application/dtos/UserDto';
import { UserService } from '@src/modules/userSession/infrastructure/application/services/UserService';
import { RegisterUserUseCase } from '@src/modules/userSession/domain/RegsterUserUseCase';
import { UserRepository } from '@src/modules/userSession/infrastructure/UserRepository';
import { toast } from '@extension/ui';

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const userService = new UserService(registerUserUseCase);

export const useUserRegistration = () => {
  return useMutation<UserResponseDto, Error, UserRegisterDto>({
    mutationFn: async (userData: UserRegisterDto) => {
      const result = await userService.registerUser(userData);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Usuario registrado correctamente', {
        description: 'Se generó una contraseña que puedes copiar y guardar.',
      });
    },
    onError: err => {
      toast.error('Error al registrar usuario', {
        description: err.message,
      });
    },
  });
};
