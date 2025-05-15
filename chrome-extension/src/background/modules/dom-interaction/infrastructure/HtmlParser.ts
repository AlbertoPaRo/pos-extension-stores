import * as cheerio from 'cheerio';

export class HtmlParser {
  findUid(html: string): { uid: string | null } {
    const $ = cheerio.load(html);
    const uid = $('a[item_id]').attr('item_id') || null;
    return { uid };
  }
}
