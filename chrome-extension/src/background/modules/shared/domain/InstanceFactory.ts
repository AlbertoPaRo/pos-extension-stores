export interface InstanceFactory<T> {
  createInstance: (baseURL: string) => T;
}
