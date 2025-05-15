import { useState } from 'react';
import { UserSearchSection } from './UserSearchSection';
import { UserResultsSection } from './UserResultsSection';
import { UserDetailsSection } from './userDetailsSection';
import { UserAddSection } from './UserAddSection';
import { ParsedUser } from '../page/UserSeachPage';
import { TabsGroup } from '../molecules/TabsGroup';

export const UserSearchTemplate = ({
  children,
  defaultUserData,
  searchProps,
  showResults,
  users = [],
  resetKey,
  contactData,
}: {
  children?: React.ReactNode;
  defaultUserData: {
    name: string;
    phoneNumber: string;
    invoiceId: string;
    idBims: number;
  };
  searchProps: React.ComponentProps<typeof UserSearchSection>;
  showResults: boolean;
  users?: ParsedUser[];
  resetKey?: string | number;
  contactData: any;
}) => {
  const [activeTab, setActiveTab] = useState('buscar');
  return (
    <div className="w-full max-w-md mx-auto h-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <UserDetailsSection {...defaultUserData} />
        <TabsGroup activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'buscar' && (
          <>
            <UserSearchSection {...searchProps} />
            <UserResultsSection key={resetKey} users={users} showResults={showResults} />
          </>
        )}
        {activeTab === 'agregar' && <UserAddSection contactData={contactData} />}
        {children}
      </div>
    </div>
  );
};
