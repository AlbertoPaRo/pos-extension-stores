export class ChromeScriptInjector {
  injectScript(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      if (!tab?.id || !tab.url) {
        console.error('❌ No se pudo obtener el ID o la URL de la pestaña.');
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            document.addEventListener(
              'click',
              event => {
                const target = event.target as HTMLElement;
                if (target) {
                  chrome.runtime.sendMessage({ html: target.outerHTML, url: window.location.href });
                }
              },
              true,
            );
          },
        },
        results => {
          if (chrome.runtime.lastError) {
            console.error('Error al inyectar script:', chrome.runtime.lastError);
          }
        },
      );
    });
  }
}
