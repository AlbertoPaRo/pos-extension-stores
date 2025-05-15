import type { DependencyContainer } from './DependencyContainer';
import type { DependencyTypesMap } from './DependencyTypesMap';

export abstract class DependencyContainerFactory<T extends DependencyTypesMap> {
  abstract createContainer(): DependencyContainer<T>;
}
