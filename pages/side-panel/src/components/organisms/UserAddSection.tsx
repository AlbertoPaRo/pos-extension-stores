import { useState } from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Input, Label, toast } from '@extension/ui';
import { UserPlus, X, Copy, Check, Mail, MessageCircle } from 'lucide-react';
import { useUserRegistration } from '@src/hooks/useUserRegistration';
import { useSendMail } from '@src/hooks/useSendMail';
import { useUpdateUserCode } from '@src/hooks/useUpdateUserCode';
import { EddressUser } from '@src/modules/userSession/infrastructure/application/dtos/UserDto';
import { ButtonSendDataByWhatsapp } from './ButtonSendDataByWhatsapp';

export const UserAddSection = ({ contactData }: { contactData: any }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [copied, setCopied] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const { updateUser, isLoading: updatingUser, wasSuccessful, setWasSuccessful } = useUpdateUserCode();

  const { mutateAsync: registerUser, isPending: loading, isSuccess: success, reset } = useUserRegistration();

  const { mutateAsync: sendMail, isPending: sendingEmail } = useSendMail();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parsedDataToSend = (user: EddressUser, password: string) => {
    return {
      to: user.email,
      data: {
        name: user.fullName,
        phone: user.phoneNumber,
        email: user.email,
        country: 'BO',
        password: password,
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!contactData.id) {
        toast.error('Error al registrar usuario', {
          description: 'Debes seleccionar un usuario de Bims',
        });
        return;
      }

      const result = await registerUser(formData);
      const dataParsed = {
        id: contactData.id,
        name: contactData.name,
        documentId: contactData.documentId,
        uid: result.user?.uid,
      };
      if (result.generatedPassword && result.user) {
        await updateUser(dataParsed);
        setGeneratedPassword(result.generatedPassword);
        const emailData = parsedDataToSend(result.user, result.generatedPassword);
        await sendMail(emailData);
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error during registration or email sending:', error);
    }
  };

  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    reset();
    setGeneratedPassword(null);
    setEmailSent(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
    });
  };

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="p-3 pb-1">
        <CardTitle className="text-sm font-semibold text-gray-800">Agregar Nuevo Usuario</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        {success && generatedPassword ? (
          <div className="space-y-3">
            <div className="text-slate-800 text-xs font-medium">✅ Usuario registrado correctamente</div>
            <div className="flex gap-2">
              <Button type="button" className="h-8 text-xs w-full flex-1" onClick={handleReset}>
                Registrar otro usuario
              </Button>
              <ButtonSendDataByWhatsapp formData={formData} />
            </div>
          </div>
        ) : (
          <form id="agregar-usuario-form" className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="h-8 text-xs"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-xs">
                Teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Número de teléfono"
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="h-8 text-xs"
                required
              />
            </div>
          </form>
        )}
      </CardContent>
      {!success && (
        <CardFooter className="p-3 pt-0 flex justify-between gap-2">
          <Button
            type="submit"
            form="agregar-usuario-form"
            className="h-8 text-xs bg-primary w-full hover:bg-primary"
            disabled={loading || sendingEmail}>
            {loading || sendingEmail ? (
              <span>Procesando...</span>
            ) : (
              <>
                <UserPlus className="h-3 w-3 mr-1" />
                Guardar Usuario
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
