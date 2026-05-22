export type ContingentEntryType = 'Singles' | 'Team' | 'Coach';
export type ContingentFinish = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ContingentCandidateRecord {
  bowlerId: number;
  bowler: string;
  gender: string | null;
  division: string;
  eventCount: number;
  bestFive: number | null;
  bestFour: number | null;
  bestThree: number | null;
  eligibleSingles: boolean;
  eligibleTeam: boolean;
}

export interface ContingentSlotRecord {
  entryType: ContingentEntryType;
  position: number;
  bowlerId: number | null;
  bowler: string;
  eventCount: number | null;
  score: number | null;
}

export interface ContingentGroupRecord {
  key: string;
  label: string;
  division: string;
  gender: string | null;
  teamIncludesSingles: boolean;
  singlesFinish: ContingentFinish | null;
  teamFinish: ContingentFinish | null;
  singles: ContingentSlotRecord | null;
  coach: ContingentSlotRecord | null;
  team: ContingentSlotRecord[];
  candidates: ContingentCandidateRecord[];
}

export interface ContingentResponseRecord {
  seasonCode: string;
  hasSavedContingent: boolean;
  groups: ContingentGroupRecord[];
  defaultGroups: ContingentGroupRecord[];
}

export interface SaveContingentEntryRecord {
  groupKey: string;
  division: string;
  gender: string | null;
  entryType: ContingentEntryType;
  position: number;
  bowlerId: number;
  finish: ContingentFinish | null;
}
