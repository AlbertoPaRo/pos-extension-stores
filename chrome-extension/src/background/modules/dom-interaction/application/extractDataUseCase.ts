import { HtmlParser } from '../infrastructure/HtmlParser';

export const extractDataUseCase = (html: string) => {
  const parser = new HtmlParser();
  return parser.findUid(html);
};
