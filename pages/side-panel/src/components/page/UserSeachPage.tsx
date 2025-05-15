import { useCallback, useEffect, useState } from 'react';
import { UserSearchTemplate } from '../organisms/UserSearchTemplate';
import { User } from '@src/modules/EddressUser/domain/interfaces/User';
import { DependencyTypes } from '@src/modules/shared/infrastructure/ConcreteDependencyContainer';
import { useDependencyContainer } from '@src/context/DependencyContainer/Provider';
import { EddressUserFindBySearchQuery } from '@src/modules/EddressUser/application/find/EddressUserFindBySearchQuery';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@extension/ui';

type ContactUsers = {
  id: number;
  name: string;
  documentId: string;
  phones: string;
};

const defaultContactData: ContactUsers = {
  id: 0,
  name: 'EnviosPet',
  documentId: '',
  phones: '',
};

export interface ParsedUser {
  id?: number;
  name: string;
  fullName: string;
  createdOn: number;
  email: string;
  phoneNumber: string;
  totalOrders: string;
  userOs?: string;
  lastOrderDate: number | null;
  walletAmount: number | null;
  uid: string;
  documentId: string;
}

export default function UserSearchPage() {
  const [contactData, setContactData] = useState<ContactUsers>(defaultContactData);
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState<ParsedUser[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [orderBy, setOrderBy] = useState<string>('name');
  const { dependencyContainer } = useDependencyContainer();
  const repository = dependencyContainer.resolve(DependencyTypes.EddressUserRepository);
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [resetKey, setResetKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: userData,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['eddressUsers', searchQuery],
    queryFn: async () => {
      if (!searchQuery) {
        toast.error('Error al buscar los datos del usuario', {
          description: 'Debes agregar un nombre al buscador',
        });
        return;
      }
      const eddressUsersData = new EddressUserFindBySearchQuery(repository);
      return await eddressUsersData.find(searchQuery);
    },
    enabled: searchQuery !== '',
  });

  const isLoading = isFetching;

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'CONTACT_DATA') {
        setContactData(message.payload);
        const searchValue = message.payload.name || message.payload.phones || message.payload.documentId || '';
        if (searchValue) {
          setFilter(searchValue);
          setSearchQuery(searchValue);
        }
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    if (contactData && contactData !== defaultContactData) {
      const searchValue = contactData.name || contactData.phones || contactData.documentId || '';
      if (searchValue) {
        setFilter(searchValue);
      }
    }
  }, [contactData]);

  const parsedData = useCallback((userData: User, contactData: any): ParsedUser => {
    return {
      id: contactData.id,
      fullName: userData.fullName || '',
      createdOn: userData.createdOn,
      email: userData.email || '',
      phoneNumber: userData.phoneNumber?.toString() || '',
      totalOrders: userData.totalOrders?.toString() || '',
      userOs: userData.userOs || '',
      lastOrderDate: userData.lastOrderDate,
      walletAmount: userData.walletAmount,
      uid: userData.uid,
      name: contactData.name,
      documentId: contactData.documentId,
    };
  }, []);

  useEffect(() => {
    if (userData) {
      let filteredData = userData || [];
      if (filter?.trim()) {
        const searchTerm = filter.toLowerCase().trim();
        filteredData = filteredData.filter(user => {
          const fullNameMatch = user.fullName?.toLowerCase().includes(searchTerm) || false;
          const emailMatch = user.email?.toLowerCase().includes(searchTerm) || false;
          const phoneNumberStr = user.phoneNumber?.toString() || '';
          const phoneMatch = phoneNumberStr.includes(searchTerm);
          const createdOnStr = user.createdOn?.toString() || '';
          const createdOnMatch = createdOnStr.includes(searchTerm);
          return fullNameMatch || emailMatch || phoneMatch || createdOnMatch;
        });
      }

      const dataParsed = filteredData.map(result => parsedData(result, contactData.id.toString()));
      const orderedResults = ordenarResults(dataParsed, orderBy);

      orderedResults.forEach(item => {
        item.id = contactData.id;
        item.name = contactData.name;
        item.documentId = contactData.documentId;
      });

      setUsers(orderedResults);
      setShowResults(true);
      setResetKey(prev => prev + 1);
    }
  }, [userData, filter, orderBy, sortDirection, contactData, parsedData]);

  const handleSearch = () => {
    setSearchQuery(filter);
    refetch();
  };

  const ordenarResults = (results: ParsedUser[], criterio: string) => {
    const sortedResults = [...results].sort((a, b) => {
      let res = 0;
      switch (criterio) {
        case 'name':
          res = (a.fullName || '').localeCompare(b.fullName || '');
          break;
        case 'orderNumber':
          res = parseInt(a.totalOrders || '0', 10) - parseInt(b.totalOrders || '0', 10);
          break;
        case 'countCreation':
          res = a.createdOn - b.createdOn;
          break;
        case 'lastOrderDate':
          if (a.lastOrderDate && b.lastOrderDate) {
            res = a.lastOrderDate - b.lastOrderDate;
            break;
          }
        case 'email':
          res = (a.email || '').localeCompare(b.email || '');
          break;
        case 'os':
          res = (a.userOs || '').localeCompare(b.userOs || '');
          break;
        case 'phoneNumber':
          res = (a.phoneNumber || '').localeCompare(b.phoneNumber || '', undefined, { numeric: true });
          break;
      }
      return sortDirection === 'asc' ? -res : res;
    });

    return sortedResults;
  };

  return (
    <UserSearchTemplate
      defaultUserData={{
        name: contactData.name,
        phoneNumber: contactData.phones,
        invoiceId: contactData.documentId,
        idBims: contactData.id,
      }}
      searchProps={{
        searchValue: filter,
        onSearchChange: setFilter,
        onSearch: handleSearch,
        sortBy: orderBy,
        onSortChange: setOrderBy,
        sortDirection,
        onSortDirectionChange: setSortDirection,
        isLoading,
      }}
      showResults={showResults}
      users={users}
      contactData={contactData}
      resetKey={resetKey}
    />
  );
}
