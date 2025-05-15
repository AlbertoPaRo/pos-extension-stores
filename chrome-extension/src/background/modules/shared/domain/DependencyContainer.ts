import type { DependencyTypesMap } from './DependencyTypesMap';

export class DependencyContainer<T extends DependencyTypesMap> {
  private readonly dependencies = new Map<string, T[keyof T]>();

  register<K extends keyof T>(key: K, dependency: T[K]): void {
    this.dependencies.set(key as string, dependency);
  }

  resolve<K extends keyof T>(key: K): T[K] {
    if (this.dependencies.has(key as string)) {
      return this.dependencies.get(key as string) as T[K];
    }
    throw new Error(`Dependency not found for key: ${key as string}`);
  }
}
