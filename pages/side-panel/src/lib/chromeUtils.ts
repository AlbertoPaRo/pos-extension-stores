export const injectScript = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    if (!tab?.id || !tab.url) {
      console.error('❌ No se pudo obtener el ID o la URL de la pestaña.');
      return;
    }

    const expectedUrl = 'https://bims.app/pos/3?mode=pos&company=1&company_id=1#';
    if (!tab.url.startsWith(expectedUrl)) {
      console.warn(`⚠ No estás en la URL permitida (${expectedUrl}).`);
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log('🚀 Script inyectado, esperando clic...');
        document.addEventListener(
          'click',
          event => {
            const target = event.target as HTMLElement;
            if (target) {
              console.log('🖱️ Clic detectado en:', target);
              chrome.runtime.sendMessage({ html: target.outerHTML, url: window.location.href });
            }
          },
          true,
        );
      },
    });
  });
};
