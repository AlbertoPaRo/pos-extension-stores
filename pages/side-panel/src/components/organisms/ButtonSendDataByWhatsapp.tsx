import { Button } from '@extension/ui';
import { MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
}

export function ButtonSendDataByWhatsapp({ formData }: { formData: FormData }) {
  const url = new URL('https://wa.me/');
  url.searchParams.append('phone', formData.phone ?? '');
  url.searchParams.append(
    'text',
    `Hola ${formData.name},\n\nBienvenido/a a enviostPet, te agradecemos por formar parte de esta comunidad. Aquí te enviamos tus datos:\n\nEmail: ${formData.email}\n\nTe hemos enviado la contraseña a este correo electrónico para que puedas ingresar a nuestra app.\n\nAdemás, te dejamos el enlace para descargar nuestra aplicación:\nhttps://enviospet.app.link/WTSBO\n\n¡Esperamos que disfrutes de nuestros servicios!`,
  );
  return (
    <a href={url.toString()} rel="noopener noreferrer" target="_blank">
      <Button className="h-8 w-full text-xs flex-1 bg-green-600 hover:bg-green-700">
        <MessageCircle className="h-4 w-4 mr-1" />
        Enviar datos por WhatsApp
      </Button>
    </a>
  );
}
