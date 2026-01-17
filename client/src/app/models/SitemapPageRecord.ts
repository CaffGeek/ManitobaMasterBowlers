export type SitemapLayout = 'full' | 'sidebar-left' | 'sidebar-right' | 'menu-only';
export type SitemapPageType = 'content' | 'route' | 'external' | 'menu-only';

export class SitemapPageRecord {
  id: string;
  title: string;
  slug: string;
  parentId?: string;
  menuVisible: boolean;
  menuOrder: number;
  layout: SitemapLayout;
  contentKey: string;
  sidebarKey?: string;
  type?: SitemapPageType;
  routePath?: string;
  externalUrl?: string;
}
