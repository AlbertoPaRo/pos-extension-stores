// import { Button } from "@extension/ui";
// import { useDependencyContainer } from "@src/context/DependencyContainer/Provider";
// import { BimsUserUpdateCode } from "@src/modules/BimsUser/application/BimsUserUpdateCode";
// import { DependencyTypes } from "@src/modules/shared/infrastructure/ConcreteDependencyContainer";
// import { useMutation } from "@tanstack/react-query";
// import { useCallback } from "react";

// export const ButtonUpdateUserCode = ({ data }: { data: any }) => {
//     const { dependencyContainer } = useDependencyContainer();
//     const repository = dependencyContainer.resolve(DependencyTypes.BimsUserReposiory);
//     const country = "BO"
//     const mutation = useMutation({
//         mutationFn: async () => {
//             const bimsSaveData = new BimsUserUpdateCode(repository);
//             return await bimsSaveData.update(country, data);
//         }
//     });
//     const handleClick = useCallback(() => {
//         mutation.mutate();
//     }, [mutation]);

//     return (
//         <Button onClick={handleClick} >
//           Enlazar Cuenta...
//         </Button>
//     );
// };

import { Button } from '@extension/ui';
import { useDependencyContainer } from '@src/context/DependencyContainer/Provider';
import { BimsUserUpdateCode } from '@src/modules/BimsUser/application/BimsUserUpdateCode';
import { DependencyTypes } from '@src/modules/shared/infrastructure/ConcreteDependencyContainer';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const ButtonUpdateUserCode = ({
  data,
  onLoading,
  onSuccess,
}: {
  data: any;
  onLoading: (loading: boolean) => void;
  onSuccess: () => void;
}) => {
  const { dependencyContainer } = useDependencyContainer();
  const repository = dependencyContainer.resolve(DependencyTypes.BimsUserReposiory);
  const country = 'BO';

  const mutation = useMutation({
    mutationFn: async () => {
      const bimsSaveData = new BimsUserUpdateCode(repository);
      return await bimsSaveData.update(country, data);
    },
    onMutate: () => onLoading(true),
    onSuccess: () => onSuccess(),
    onSettled: () => onLoading(false),
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? 'Enlazando...' : 'Enlazar Cuenta...'}
    </Button>
  );
};
