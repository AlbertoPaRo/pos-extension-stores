import { ChromeScriptInjector } from '../infrastructure/chromeScriptInjector';

export const injectScriptUseCase = async (): Promise<void> => {
  const injector = new ChromeScriptInjector();
  await injector.injectScript();
};
