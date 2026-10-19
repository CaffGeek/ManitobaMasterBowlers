export type SponsorAdLocation = 'Top' | 'Bottom' | 'Left' | 'Right' | 'Overlay';
export type SponsorPageMatchType = 'All' | 'Exact' | 'Prefix' | 'Sitemap';

export interface SponsorAdPlacementRecord {
  Id?: number;
  SponsorAdId?: number;
  Location: SponsorAdLocation;
  PageMatchType: SponsorPageMatchType;
  PageValue?: string | null;
  SortOrder: number;
}

export interface SponsorAdRecord {
  Id?: number;
  SponsorId: number;
  SponsorName?: string;
  WebsiteUrl?: string | null;
  DefaultLogoUrl?: string | null;
  Name: string;
  ContentHtml: string;
  StartDate?: string | null;
  EndDate?: string | null;
  IsActive: boolean;
  Priority: number;
  RotationSeconds?: number | null;
  Placements?: SponsorAdPlacementRecord[];
  Locations?: SponsorAdLocation[];
}

export interface SponsorRecord {
  Id?: number;
  Name: string;
  WebsiteUrl?: string | null;
  DefaultLogoUrl?: string | null;
  Notes?: string | null;
  IsActive: boolean;
  Ads: SponsorAdRecord[];
}
