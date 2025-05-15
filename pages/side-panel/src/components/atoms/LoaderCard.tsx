import { Loader } from '@extension/ui';
import { CheckCircle } from 'lucide-react';

export const LoaderCard = ({ text, variant }: { text: string; variant: 'loader' | 'success' }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
      {variant === 'loader' ? <Loader variant="spinner" size="md" /> : <CheckCircle className="w-4 h-4" />}
      <h2 className="font-bold text-lg">{text}</h2>
    </div>
  );
};
