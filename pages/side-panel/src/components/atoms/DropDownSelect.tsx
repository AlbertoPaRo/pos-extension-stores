import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@extension/ui';
import { Button } from '@extension/ui';
import { Check, ChevronDown } from 'lucide-react';

export const DropdownSelect = ({
  options,
  selected,
  onSelect,
  label,
}: {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
  label: string;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
        {options.find(opt => opt.value === selected)?.label || 'Seleccionar'}
        <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-[180px]">
      {options.map(option => (
        <DropdownMenuItem
          key={option.value}
          onClick={() => onSelect(option.value)}
          className="flex items-center justify-between">
          {option.label}
          {selected === option.value && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
