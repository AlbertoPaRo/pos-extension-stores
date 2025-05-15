import { DropdownSelect } from '../atoms/DropDownSelect';
import { SearchBar } from '../molecules/SearchBar';

const SORT_OPTIONS = [
  { value: 'name', label: 'Nombre' },
  { value: 'orderNumber', label: 'Numero de Ordenes' },
  { value: 'lastOrder', label: 'Ultima Orden' },
  { value: 'countCreation', label: 'Creacion de la cuenta' },
  { value: 'email', label: 'Email' },
  { value: 'os', label: 'Os' },
  { value: 'phoneNumber', label: 'Telefono' },
];

const SORT_DIRECTION = [
  { value: 'asc', label: 'Ascendente' },
  { value: 'dsc', label: 'Decendente' },
];

export const UserSearchSection = ({
  searchValue,
  onSearchChange,
  onSearch,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
  isLoading,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortDirection: string;
  onSortDirectionChange: (value: string) => void;
  isLoading: boolean;
}) => (
  <div className="p-4 border-b border-gray-200">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Ordenar Por:</span>
        <DropdownSelect options={SORT_OPTIONS} selected={sortBy} onSelect={onSortChange} label="Ordenar por" />
        <DropdownSelect options={SORT_DIRECTION} selected={sortDirection} onSelect={onSortDirectionChange} label="" />
      </div>
    </div>
    <SearchBar
      value={searchValue}
      onChange={onSearchChange}
      onSearch={onSearch}
      placeholder="Buscar..."
      isPending={isLoading}
    />
  </div>
);
