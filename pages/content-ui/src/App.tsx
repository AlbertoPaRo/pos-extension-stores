// import { Button } from "@extension/ui";

// const App = ({ hasEddressData }: { contactData: any; hasEddressData: boolean }) => {
//   const openSidePanel = async () => {
//     try {
//       await chrome.runtime.sendMessage({ action: "openSidePanel" });
//     } catch (error) {
//       console.error("Error al abrir el panel lateral:", error);
//     }
//   };
//   return (
//     <>
//       <div>{hasEddressData ? (<b>Usuario Eddress: Si</b>) : (<div className="h-full">
//         <Button
//           variant="destructive"
//           className="h-11 text-lg font-bold w-64 rounded-lg hover:bg-[#01579B] bg-[#2196F3]"
//           onClick={openSidePanel}
//         >
//           Agregar Usuario a Eddress
//         </Button>
//       </div>)}</div>
//     </>
//   );
// }

// export default App;

import { Button } from '@extension/ui';

const App = ({ hasEddressData }: { contactData: any; hasEddressData: boolean }) => {
  const openSidePanel = async () => {
    try {
      // Abre el panel
      await chrome.runtime.sendMessage({ action: 'openSidePanel' });

      // Ejecuta extracción de contacto desde el DOM real
      await chrome.runtime.sendMessage({ action: 'extractContactFromDOM' });
    } catch (error) {
      console.error('Error al abrir el panel o extraer contacto:', error);
    }
  };

  return (
    <div>
      {hasEddressData ? (
        <b>Usuario Eddress: Sí</b>
      ) : (
        <div className="h-full">
          <Button
            variant="destructive"
            className="h-11 text-lg font-bold w-64 rounded-lg hover:bg-[#01579B] bg-[#2196F3]"
            onClick={openSidePanel}>
            Agregar Usuario a Eddress
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
