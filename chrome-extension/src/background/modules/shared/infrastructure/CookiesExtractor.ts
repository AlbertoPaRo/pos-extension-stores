export class CookiesExtractor {
  static async getCookies(url: string): Promise<string | null> {
    return new Promise(resolve => {
      chrome.cookies.getAll({ url }, cookies => {
        if (!cookies || cookies.length === 0) {
          console.error('❌ No se encontraron cookies para:', url);
          resolve(null);
          return;
        }
        const cookieString = cookies.map(c => `${c.name}=${c.value}`).join('; ');
        resolve(cookieString);
      });
    });
  }
}
