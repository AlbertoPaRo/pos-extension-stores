import {
  ConcreteDependencyContainerFactory,
  DependencyTypes,
  type ConcreteDependencyTypesMap,
} from '@src/modules/shared/infrastructure/ConcreteDependencyContainer';

import { DependencyContainer } from '@src/modules/shared/domain/DependencyContainer';
import { StringValueObject } from '@src/modules/shared/domain/StringValueObject';
import { createContext, useCallback, useContext, useEffect } from 'react';

const DependencyContainerContext = createContext<
  | {
      dependencyContainer: DependencyContainer<ConcreteDependencyTypesMap>;
      existsToken: () => boolean;
    }
  | undefined
>(undefined);

interface DependencyContainerProviderProps {
  children: React.ReactNode;
}

export function DependencyContainerProvider({ children }: DependencyContainerProviderProps) {
  const token = StringValueObject.create(process.env.CEB_EDDRESS_BEARER_TOKEN, 'Eddress Bearer Token');
  const factory = new ConcreteDependencyContainerFactory();
  const dependencyContainer = factory.createContainer();

  useEffect(() => {
    if (token) {
      dependencyContainer.resolve(DependencyTypes.TokenRepository).setToken(token.getValue());
    }
  }, [dependencyContainer, token]);

  const existsToken = useCallback(
    () => Boolean(dependencyContainer.resolve(DependencyTypes.TokenRepository).getToken()),
    [dependencyContainer],
  );

  const value = { dependencyContainer, existsToken };
  return <DependencyContainerContext.Provider value={value}>{children}</DependencyContainerContext.Provider>;
}
export function useDependencyContainer() {
  const context = useContext(DependencyContainerContext);
  if (context === undefined) {
    throw new Error('useDependencyContainer must be used within DependencyContainerProvider');
  }
  return context;
}
