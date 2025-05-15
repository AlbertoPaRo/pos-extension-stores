import { createRoot } from 'react-dom/client';
import App from '@src/App';
// @ts-expect-error Because file doesn't exist before build
import tailwindcssOutput from '../dist/tailwind-output.css?inline';

let contactData: any = null;

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'HasEddressData') {
    injectReactComponent(message.payload);
  }
});

const injectReactComponent = (hasEddressData: boolean) => {
  const contactDesc = document.querySelector('.contact-desc');
  const titleElement = contactDesc?.querySelector('h1');

  if (!contactDesc || !titleElement) {
    console.log('⚠️ No se encontró .contact-desc o h1, abortando.');
    return;
  }

  let root = document.querySelector('#chrome-extension-root');

  if (root) {
    console.log('🔄 Eliminando React y reiniciando...');
    root.remove();
  }

  root = document.createElement('div');
  root.id = 'chrome-extension-root';
  titleElement.insertAdjacentElement('afterend', root);

  const shadowRoot = root.attachShadow({ mode: 'open' });
  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  try {
    const globalStyleSheet = new CSSStyleSheet();
    globalStyleSheet.replaceSync(tailwindcssOutput);
    shadowRoot.adoptedStyleSheets = [globalStyleSheet];
  } catch (error) {
    console.error('❌ Error cargando Tailwind CSS:', error);
  }

  shadowRoot.appendChild(rootIntoShadow);
  createRoot(rootIntoShadow).render(<App contactData={contactData} hasEddressData={hasEddressData} />);
};
