import { FetchBimsUserFinder } from '../../bims/application/find/BimsContactFinder';
import { Repository } from '../domain/types';
import { FetchBimsUserRepository } from '../../bims/infrastructure/FetchBimsUserRepository';

export interface ContactData {
  id: string;
  name: string;
  code: string;
  documentId: string;
}

export const createFetchContactUseCase =
  (repository: Repository<ContactData | null>) =>
  async (uid: string): Promise<ContactData | null> => {
    const cachedData: ContactData | null = await repository.get(uid);
    if (cachedData) {
      return cachedData;
    }

    try {
      const fetchBimsUserRepository = new FetchBimsUserRepository();
      const getData = new FetchBimsUserFinder(fetchBimsUserRepository);
      const contactData = await getData.run(uid);
      if (!contactData) {
        return null;
      }

      const simplifiedData = {
        id: contactData?.id || null,
        name: contactData?.name || null,
        code: contactData.code,
        phones: contactData.phones,
        documentId: contactData.document_id,
      };

      await repository.save(uid, simplifiedData as ContactData);
      return simplifiedData as ContactData;
    } catch (error) {
      console.error('Error al obtener datos del contacto:', error);
      return null;
    }
  };
