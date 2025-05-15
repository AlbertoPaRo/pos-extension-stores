export const UserDetailsSection = ({
  name,
  phoneNumber,
  invoiceId,
  idBims,
}: {
  name: string;
  phoneNumber: string;
  invoiceId: string;
  idBims: number;
}) => (
  <div className="p-4 border-b border-gray-200">
    <h2 className="text-lg font-medium mb-3">Datos del usuario</h2>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <span className="block text-sm font-medium mb-1">Nombre:</span>
        <span className="block">{name}</span>
      </div>
      <div>
        <span className="block text-sm font-medium mb-1">Numero de telefono:</span>
        <span className="block">{phoneNumber}</span>
      </div>
      <div>
        <span className="block text-sm font-medium mb-1">NIT:</span>
        <span className="block">{invoiceId}</span>
      </div>
      <div>
        <span className="block text-sm font-medium mb-1">Id Bims:</span>
        <span className="block">{idBims}</span>
      </div>
    </div>
  </div>
);
