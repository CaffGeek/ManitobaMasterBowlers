export class NationalAppearanceRecord {
  SeasonCode: string;
  SeasonDesc: string | null;
  GroupKey: string;
  GroupLabel: string;
  Division: string;
  Gender: string | null;
  EntryType: 'Singles' | 'Team' | 'Coach';
  Position: number;
  Finish: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
}
