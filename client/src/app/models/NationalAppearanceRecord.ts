export class NationalAppearanceRecord {
  SeasonCode: string;
  SeasonDesc: string | null;
  GroupKey: string;
  GroupLabel: string;
  Division: string;
  Gender: string | null;
  EntryType: 'Singles' | 'Team' | 'Coach';
  Position: number;
}
