import { Button, Input } from '@extension/ui';
import { ButtonWithIcon } from '../atoms/ButtonWithIcon';
import { Loader, Loader2, Search } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar usuario...',
  isPending,
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isPending: boolean;
}) => {
  return (
    <div className="flex gap-1">
      <Input
        placeholder="Buscar usuario..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-8 text-xs"
      />
      {isPending ? (
        <div className="bg-gray-700 h-8 w-8 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-4 w-4 text-white duration-500" />
        </div>
      ) : (
        <Button variant="default" onClick={onSearch} className="bg-gray-900 hover:bg-gray-800 h-8 px-2">
          <Search className="h-3 w-3" />
          <span className="sr-only">Buscar</span>
        </Button>
      )}
    </div>
  );
};
