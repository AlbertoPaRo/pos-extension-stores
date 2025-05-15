import { ContactData } from '../application/fetchContactUseCase';
import { Repository } from '../domain/types';

function openDatabase(dbName: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => reject(`Error al abrir la base de datos ${dbName}`);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'key' });
      }
    };
  });
}

export const createIndexedDbRepository = <T>(dbName: string, storeName: string): Repository<T> => ({
  get: async (key: string): Promise<ContactData | null> => {
    const db = await openDatabase(dbName, storeName);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.data || null);
      request.onerror = () => reject(`Error al obtener datos de ${dbName}`);
    });
  },

  save: async (key: string, data: T): Promise<void> => {
    const db = await openDatabase(dbName, storeName);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      store.put({ key, data });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(`Error al guardar datos en ${dbName}`);
    });
  },
});
