import { injectScriptUseCase } from './injectScriptUseCase';

export const handleTabUpdate = () => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.startsWith('https://bims.app/')) {
      console.log('🔄 Página de BIMS cargada, inyectando script...');
      injectScriptUseCase();
    }
  });
};
