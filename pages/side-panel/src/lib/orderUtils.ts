import * as cheerio from 'cheerio';

export const findUid = (html: string, url: string): { uid: string | null; isOrderId: boolean } => {
  const $ = cheerio.load(html);
  console.log('>>>>>>', url);
  const uid = $('a[item_id]').attr('item_id') || null;
  return { uid, isOrderId: false };
};
