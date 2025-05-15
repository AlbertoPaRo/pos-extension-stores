export interface DomInteractionRepository {
  injectScript(): void;
  findUid(html: string, url: string): { uid: string | null; isOrderId: boolean };
}
