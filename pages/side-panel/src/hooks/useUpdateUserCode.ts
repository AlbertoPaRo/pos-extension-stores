import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDependencyContainer } from '@src/context/DependencyContainer/Provider';
import { BimsUserUpdateCode } from '@src/modules/BimsUser/application/BimsUserUpdateCode';
import { DependencyTypes } from '@src/modules/shared/infrastructure/ConcreteDependencyContainer';
import { toast } from '@extension/ui';

export const useUpdateUserCode = () => {
  const { dependencyContainer } = useDependencyContainer();
  const repository = dependencyContainer.resolve(DependencyTypes.BimsUserReposiory);
  const country = 'BO';

  const [isLoading, setIsLoading] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const bimsSaveData = new BimsUserUpdateCode(repository);
      return await bimsSaveData.update(country, data);
    },
    onMutate: () => setIsLoading(true),
    onSuccess: () => setWasSuccessful(true),
    onSettled: () => setIsLoading(false),
    onError: err => {
      toast.error('Error al actualizar datos del usuario', {
        description: err.message,
      });
    },
  });

  const updateUser = useCallback(
    (data: any) => {
      console.log('>>>UPDATE', data);
      if (!data.id) {
        toast.error('Error al actualizar datos del usuario', {
          description: 'Debes seleccionar un usuario de Bims',
        });
        return;
      }
      mutation.mutate(data);
    },
    [mutation],
  );

  return {
    updateUser,
    isLoading,
    wasSuccessful,
    setWasSuccessful,
  };
};
