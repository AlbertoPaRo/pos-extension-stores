import { Button } from '@extension/ui';

export interface UserData {
  fullName: string;
  createdOn: number;
  email: string;
  phoneNumber: string;
  totalOrders: string;
  userOs?: string;
  id?: number;
  uid: string;
  lastOrderDate: number | null;
}

export const UserInfoCard = ({ user, onUpdate }: { user: UserData; onUpdate: (user: UserData) => void }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2">
          <div className="text-slate-900 font-bold text-lg">{user.fullName}</div>
        </div>
        <div>
          <div className="font-medium">Fecha de Creacion</div>
          <div className="text-gray-600">{formatDate(user.createdOn)}</div>
        </div>
        <div>
          <div className="font-medium">Email</div>
          <div className="text-gray-600">{user.email}</div>
        </div>
        <div>
          <div className="font-medium">Telefono</div>
          <div className="text-gray-600">{user.phoneNumber}</div>
        </div>
        <div>
          <div className="font-medium">Ordenes Totales</div>
          <div className="text-gray-600">{user.totalOrders}</div>
        </div>
        <div>
          <div className="font-medium">Sistema Operativo</div>
          <div className="text-gray-600">{user.userOs}</div>
        </div>
        <div>
          <div className="font-medium">Ultima Compra</div>
          <div className="text-gray-600">{user.lastOrderDate && formatDate(user.lastOrderDate)}</div>
        </div>
        <div className="col-span-2">
          <Button onClick={() => onUpdate(user)}>Enlazar Cuenta...</Button>
        </div>
      </div>
    </div>
  );
};
