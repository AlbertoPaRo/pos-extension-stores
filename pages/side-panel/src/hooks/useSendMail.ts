import { useDependencyContainer } from '@src/context/DependencyContainer/Provider';
import { SendUsersDataByEmail } from '@src/modules/email/application/send/SendUsersDataByEmail';
import { DependencyTypes } from '@src/modules/shared/infrastructure/ConcreteDependencyContainer';
import { useMutation } from '@tanstack/react-query';

export const useSendMail = () => {
  const { dependencyContainer } = useDependencyContainer();
  const repository = dependencyContainer.resolve(DependencyTypes.EmailRepository);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const bimsSaveData = new SendUsersDataByEmail(repository);
      return await bimsSaveData.send(data);
    },
  });

  return mutation;
};
