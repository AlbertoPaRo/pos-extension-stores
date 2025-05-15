import { Tabs, TabsList, TabsTrigger } from '@extension/ui';
import { Plus } from 'lucide-react';

export const TabsGroup = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => (
  <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
    <TabsList className="grid grid-cols-2 h-9">
      <TabsTrigger value="buscar" className="text-xs">
        Buscar Usuarios
      </TabsTrigger>
      <TabsTrigger value="agregar" className="text-xs">
        <Plus className="h-3 w-3 mr-1" />
        Nuevo Usuario
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
