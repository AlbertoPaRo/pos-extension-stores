import { Badge, Button } from '@extension/ui';
import { UserInfoCard } from '../molecules/UserInfoCard';
import { ParsedUser } from '../page/UserSeachPage';
import { useUpdateUserCode } from '@src/hooks/useUpdateUserCode';
import { LoaderCard } from '../atoms/LoaderCard';

export const UserResultsSection = ({ users, showResults }: { users: ParsedUser[]; showResults: boolean }) => {
  const { updateUser, isLoading, wasSuccessful, setWasSuccessful } = useUpdateUserCode();

  if (!showResults) return null;

  return (
    <div className="p-4">
      <div className="w-full flex flex-row justify-between">
        <h3 className="text-sm font-medium mb-2">
          Resultados{' '}
          <Badge variant="outline" className="ml-1 text-xs">
            {users.length}
          </Badge>
        </h3>
        {wasSuccessful && (
          <Button
            variant="outline"
            className="h-6 text-sm font-medium"
            onClick={() => {
              setWasSuccessful(false);
            }}>
            Limpiar
          </Button>
        )}
      </div>

      {isLoading ? (
        <LoaderCard text="Cargando..." variant="loader" />
      ) : wasSuccessful ? (
        <LoaderCard text="Usuario actualizado exitosamente" variant="success" />
      ) : users.length > 0 ? (
        <div className="max-h-[500px] overflow-y-auto pr-1">
          <div className="space-y-2">
            {users.map(user => (
              <UserInfoCard key={user.id} user={user} onUpdate={updateUser} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron resultados</p>
      )}
    </div>
  );
};
