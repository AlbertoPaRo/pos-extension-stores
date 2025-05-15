import { ContactData } from '../application/fetchContactUseCase';

export interface Repository<T> {
  get: (key: string) => Promise<ContactData | null>;
  save: (key: string, data: T) => Promise<void>;
}
