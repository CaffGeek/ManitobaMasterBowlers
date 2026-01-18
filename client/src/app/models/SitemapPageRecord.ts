export type SitemapPageType = 'content' | 'route' | 'external' | 'menu-only';

export class SitemapPageRecord {
  id: string;
  title: string;
  slug: string;
  parentId?: string;
  menuVisible: boolean;
  menuOrder: number;
  contentKey: string;
  type?: SitemapPageType;
  routePath?: string;
  externalUrl?: string;
}
