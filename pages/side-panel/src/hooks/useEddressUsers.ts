import { useQuery } from '@tanstack/react-query';
import { EddressUserFindBySearchQuery } from '@src/modules/EddressUser/application/find/EddressUserFindBySearchQuery';
import { DependencyTypes } from '@src/modules/shared/infrastructure/ConcreteDependencyContainer';
import { useDependencyContainer } from '@src/context/DependencyContainer/Provider';

export const useEddressUsers = (searchQuery: string, enabled = true) => {
  const { dependencyContainer } = useDependencyContainer();
  const repository = dependencyContainer.resolve(DependencyTypes.EddressUserRepository);

  return useQuery({
    queryKey: ['eddressUsers', searchQuery],
    queryFn: async () => {
      const eddressUsersData = new EddressUserFindBySearchQuery(repository);
      return await eddressUsersData.find(searchQuery);
    },
    enabled: !!searchQuery && enabled,
  });
};
