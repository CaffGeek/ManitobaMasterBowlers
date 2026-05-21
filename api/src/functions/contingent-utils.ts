import * as sql from 'mssql';

export type ContingentEntryType = 'Singles' | 'Team' | 'Coach';

type GroupConfig = {
  key: string;
  label: string;
  division: string;
  gender: string | null;
  teamIncludesSingles: boolean;
  teamSize: number;
  singlesEventCount: number;
  teamEventCount: number;
};

type ResultRow = {
  Division: string;
  BowlerId: number;
  Bowler: string;
  Gender: string | null;
  Game1?: number;
  Game2?: number;
  Game3?: number;
  Game4?: number;
  Game5?: number;
  Game6?: number;
  Game7?: number;
  Game8?: number;
  Average?: number;
};

type SavedEntryRow = {
  GroupKey: string;
  EntryType: ContingentEntryType;
  Position: number;
  BowlerId: number;
  Bowler: string;
};

type AggregatedCandidate = {
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
};

type ContingentSlot = {
  entryType: ContingentEntryType;
  position: number;
  bowlerId: number | null;
  bowler: string;
  eventCount: number | null;
  score: number | null;
};

type ContingentGroup = {
  key: string;
  label: string;
  division: string;
  gender: string | null;
  teamIncludesSingles: boolean;
  singles: ContingentSlot | null;
  coach: ContingentSlot | null;
  team: ContingentSlot[];
  candidates: AggregatedCandidate[];
};

export type ContingentResponse = {
  seasonCode: string;
  hasSavedContingent: boolean;
  groups: ContingentGroup[];
  defaultGroups: ContingentGroup[];
};

export type SaveContingentEntry = {
  groupKey: string;
  division: string;
  gender: string | null;
  entryType: ContingentEntryType;
  position: number;
  bowlerId: number;
};

const groupConfigs: GroupConfig[] = [
  {
    key: 'tournament-men',
    label: 'Tournament Men',
    division: 'Tournament',
    gender: 'M',
    teamIncludesSingles: false,
    teamSize: 5,
    singlesEventCount: 5,
    teamEventCount: 4,
  },
  {
    key: 'tournament-women',
    label: 'Tournament Women',
    division: 'Tournament',
    gender: 'L',
    teamIncludesSingles: false,
    teamSize: 5,
    singlesEventCount: 5,
    teamEventCount: 4,
  },
  {
    key: 'teaching-men',
    label: 'Teaching Men',
    division: 'Teaching',
    gender: 'M',
    teamIncludesSingles: true,
    teamSize: 5,
    singlesEventCount: 5,
    teamEventCount: 4,
  },
  {
    key: 'teaching-women',
    label: 'Teaching Women',
    division: 'Teaching',
    gender: 'L',
    teamIncludesSingles: true,
    teamSize: 5,
    singlesEventCount: 5,
    teamEventCount: 4,
  },
  {
    key: 'senior-mixed',
    label: 'Senior Mixed',
    division: 'Senior',
    gender: null,
    teamIncludesSingles: true,
    teamSize: 5,
    singlesEventCount: 4,
    teamEventCount: 3,
  },
];

export async function loadContingent(seasonCode: string): Promise<ContingentResponse> {
  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    throw new Error('SqlConnectionString is not configured.');
  }

  const pool = await sql.connect(connectionString);
  const [resultsRows, savedRows] = await Promise.all([
    pool.request()
      .input('seasonCode', sql.VarChar(4), seasonCode)
      .query(`
        SELECT
          tt.Division,
          ml.ID AS BowlerId,
          ml.Name AS Bowler,
          ml.Gender,
          tr.Game1,
          tr.Game2,
          tr.Game3,
          tr.Game4,
          tr.Game5,
          tr.Game6,
          tr.Game7,
          tr.Game8,
          tr.BowlerAverage AS Average
        FROM TournamentResults tr
        JOIN TournamentTable tt ON tt.Id = tr.TournamentId
        JOIN MasterList ml ON ml.ID = tr.BowlerId
        WHERE tt.SeasonCode = @seasonCode
      `),
    pool.request()
      .input('seasonCode', sql.VarChar(4), seasonCode)
      .query(`
        SELECT
          e.GroupKey,
          e.EntryType,
          e.Position,
          e.BowlerId,
          ml.Name AS Bowler
        FROM NationalContingentEntries e
        JOIN MasterList ml ON ml.ID = e.BowlerId
        WHERE e.SeasonCode = @seasonCode
      `),
  ]);

  const candidateMap = buildCandidateMap((resultsRows.recordset || []) as ResultRow[]);
  const defaultGroups = groupConfigs.map((config) => buildDefaultGroup(config, candidateMap));
  const hasSavedContingent = (savedRows.recordset || []).length > 0;

  return {
    seasonCode,
    hasSavedContingent,
    groups: hasSavedContingent
      ? groupConfigs.map((config) =>
          applySavedGroup(config, candidateMap, (savedRows.recordset || []) as SavedEntryRow[])
        )
      : defaultGroups,
    defaultGroups,
  };
}

export function getGroupConfigs(): GroupConfig[] {
  return groupConfigs;
}

function buildCandidateMap(rows: ResultRow[]): Map<string, AggregatedCandidate[]> {
  const result = new Map<string, AggregatedCandidate[]>();

  groupConfigs.forEach((config) => {
    const filtered = rows.filter((row) =>
      row.Division === config.division && (config.gender ? row.Gender === config.gender : true)
    );

    const byBowler = new Map<number, { bowler: string; gender: string | null; scratchScores: number[]; metricScores: number[] }>();
    filtered.forEach((row) => {
      const existing = byBowler.get(row.BowlerId) || {
        bowler: row.Bowler,
        gender: row.Gender,
        scratchScores: [],
        metricScores: [],
      };

      const scratch = computeScratch(row);
      const metric = config.division === 'Tournament' ? scratch : computePoa(row);

      if (metric !== null) {
        existing.metricScores.push(metric);
      }
      existing.scratchScores.push(scratch);
      byBowler.set(row.BowlerId, existing);
    });

    const candidates = Array.from(byBowler.entries())
      .map(([bowlerId, data]) => {
        const sortedScores = [...data.metricScores].sort((a, b) => b - a);
        return {
          bowlerId,
          bowler: data.bowler,
          gender: data.gender,
          division: config.division,
          eventCount: sortedScores.length,
          bestFive: sortedScores.length >= 5 ? sumTop(sortedScores, 5) : null,
          bestFour: sortedScores.length >= 4 ? sumTop(sortedScores, 4) : null,
          bestThree: sortedScores.length >= 3 ? sumTop(sortedScores, 3) : null,
          eligibleSingles: sortedScores.length >= config.singlesEventCount,
          eligibleTeam: sortedScores.length >= config.teamEventCount,
        } as AggregatedCandidate;
      })
      .sort((a, b) => compareCandidates(a, b, config.singlesEventCount, config.teamEventCount));

    result.set(config.key, candidates);
  });

  return result;
}

function buildDefaultGroup(config: GroupConfig, candidateMap: Map<string, AggregatedCandidate[]>): ContingentGroup {
  const candidates = candidateMap.get(config.key) || [];
  const singlesCandidate = candidates.find((candidate) => candidate.eligibleSingles) || null;
  const teamCandidates = candidates
    .filter((candidate) => candidate.eligibleTeam)
    .sort((a, b) => compareTeamCandidates(a, b, config.teamEventCount, config.singlesEventCount));

  const team: ContingentSlot[] = [];
  if (config.teamIncludesSingles && singlesCandidate) {
    team.push(toSlot('Team', 1, singlesCandidate, scoreForCount(singlesCandidate, config.teamEventCount)));
  }

  const teamSeed = team.map((slot) => slot.bowlerId);
  teamCandidates
    .filter((candidate) => {
      if (!config.teamIncludesSingles && singlesCandidate && candidate.bowlerId === singlesCandidate.bowlerId) {
        return false;
      }
      return !teamSeed.includes(candidate.bowlerId);
    })
    .slice(0, config.teamSize - team.length)
    .forEach((candidate) => {
      team.push(toSlot('Team', team.length + 1, candidate, scoreForCount(candidate, config.teamEventCount)));
    });

  while (team.length < config.teamSize) {
    team.push(emptySlot('Team', team.length + 1));
  }

  return {
    key: config.key,
    label: config.label,
    division: config.division,
    gender: config.gender,
    teamIncludesSingles: config.teamIncludesSingles,
    singles: singlesCandidate ? toSlot('Singles', 1, singlesCandidate, scoreForCount(singlesCandidate, config.singlesEventCount)) : emptySlot('Singles', 1),
    coach: emptySlot('Coach', 1),
    team,
    candidates,
  };
}

function applySavedGroup(
  config: GroupConfig,
  candidateMap: Map<string, AggregatedCandidate[]>,
  savedRows: SavedEntryRow[]
): ContingentGroup {
  const defaults = buildDefaultGroup(config, candidateMap);
  const savedGroupRows = savedRows.filter((row) => row.GroupKey === config.key);
  const candidateById = new Map<number, AggregatedCandidate>(
    defaults.candidates.map((candidate) => [candidate.bowlerId, candidate])
  );

  const singlesRow = savedGroupRows.find((row) => row.EntryType === 'Singles' && row.Position === 1);
  const singlesCandidate = singlesRow ? candidateById.get(singlesRow.BowlerId) : null;
  const coachRow = savedGroupRows.find((row) => row.EntryType === 'Coach' && row.Position === 1);

  const teamRows = savedGroupRows
    .filter((row) => row.EntryType === 'Team')
    .sort((a, b) => a.Position - b.Position);

  const team = teamRows.map((row) => {
    const candidate = candidateById.get(row.BowlerId);
    return candidate
      ? toSlot('Team', row.Position, candidate, scoreForCount(candidate, config.teamEventCount))
      : {
          entryType: 'Team' as ContingentEntryType,
          position: row.Position,
          bowlerId: row.BowlerId,
          bowler: row.Bowler,
          eventCount: null,
          score: null,
        };
  });

  while (team.length < config.teamSize) {
    team.push(emptySlot('Team', team.length + 1));
  }

  if (config.teamIncludesSingles) {
    if ((!team[0]?.bowlerId) && singlesRow) {
      const candidate = candidateById.get(singlesRow.BowlerId);
      team[0] = candidate
        ? toSlot('Team', 1, candidate, scoreForCount(candidate, config.teamEventCount))
        : {
            entryType: 'Team' as ContingentEntryType,
            position: 1,
            bowlerId: singlesRow.BowlerId,
            bowler: singlesRow.Bowler,
            eventCount: null,
            score: null,
          };
    }
  }

  return {
    ...defaults,
    singles: config.teamIncludesSingles
      ? team[0]
        ? {
            ...team[0],
            entryType: 'Singles' as ContingentEntryType,
            score: team[0].bowlerId ? scoreForCount(candidateById.get(team[0].bowlerId || 0) || null, config.singlesEventCount) : null,
          }
        : defaults.singles
      : singlesRow
        ? (singlesCandidate
            ? toSlot('Singles', 1, singlesCandidate, scoreForCount(singlesCandidate, config.singlesEventCount))
            : {
                entryType: 'Singles' as ContingentEntryType,
                position: 1,
                bowlerId: singlesRow.BowlerId,
                bowler: singlesRow.Bowler,
                eventCount: null,
                score: null,
              })
        : defaults.singles,
    coach: coachRow
      ? {
          entryType: 'Coach' as ContingentEntryType,
          position: 1,
          bowlerId: coachRow.BowlerId,
          bowler: coachRow.Bowler,
          eventCount: null,
          score: null,
        }
      : defaults.coach,
    team,
  };
}

function toSlot(
  entryType: ContingentEntryType,
  position: number,
  candidate: AggregatedCandidate,
  score: number | null
): ContingentSlot {
  return {
    entryType,
    position,
    bowlerId: candidate.bowlerId,
    bowler: candidate.bowler,
    eventCount: candidate.eventCount,
    score,
  };
}

function emptySlot(entryType: ContingentEntryType, position: number): ContingentSlot {
  return {
    entryType,
    position,
    bowlerId: null,
    bowler: '',
    eventCount: null,
    score: null,
  };
}

function computeScratch(row: ResultRow): number {
  return [
    row.Game1,
    row.Game2,
    row.Game3,
    row.Game4,
    row.Game5,
    row.Game6,
    row.Game7,
    row.Game8,
  ].reduce((total, value) => total + (Number(value) || 0), 0);
}

function computePoa(row: ResultRow): number | null {
  const average = Number(row.Average) || 0;
  if (!average || average === 450) {
    return null;
  }

  return [
    row.Game1,
    row.Game2,
    row.Game3,
    row.Game4,
    row.Game5,
    row.Game6,
    row.Game7,
    row.Game8,
  ].reduce((total, value) => {
    const game = Number(value) || 0;
    return total + (game > 0 ? game - average : 0);
  }, 0);
}

function sumTop(values: number[], count: number): number {
  return values.slice(0, Math.min(count, values.length)).reduce((total, value) => total + value, 0);
}

function compareCandidates(a: AggregatedCandidate, b: AggregatedCandidate, primaryCount: number, secondaryCount: number): number {
  const primaryA = scoreForCount(a, primaryCount) ?? Number.NEGATIVE_INFINITY;
  const primaryB = scoreForCount(b, primaryCount) ?? Number.NEGATIVE_INFINITY;
  if (primaryB !== primaryA) {
    return primaryB - primaryA;
  }

  const secondaryA = scoreForCount(a, secondaryCount) ?? Number.NEGATIVE_INFINITY;
  const secondaryB = scoreForCount(b, secondaryCount) ?? Number.NEGATIVE_INFINITY;
  if (secondaryB !== secondaryA) {
    return secondaryB - secondaryA;
  }

  return a.bowler.localeCompare(b.bowler);
}

function compareTeamCandidates(a: AggregatedCandidate, b: AggregatedCandidate, primaryCount: number, secondaryCount: number): number {
  const primaryA = scoreForCount(a, primaryCount) ?? Number.NEGATIVE_INFINITY;
  const primaryB = scoreForCount(b, primaryCount) ?? Number.NEGATIVE_INFINITY;
  if (primaryB !== primaryA) {
    return primaryB - primaryA;
  }

  const secondaryA = scoreForCount(a, secondaryCount) ?? Number.NEGATIVE_INFINITY;
  const secondaryB = scoreForCount(b, secondaryCount) ?? Number.NEGATIVE_INFINITY;
  if (secondaryB !== secondaryA) {
    return secondaryB - secondaryA;
  }

  return a.bowler.localeCompare(b.bowler);
}

function scoreForCount(candidate: AggregatedCandidate | null, count: number): number | null {
  if (!candidate) {
    return null;
  }

  switch (count) {
    case 5:
      return candidate.bestFive;
    case 4:
      return candidate.bestFour;
    case 3:
      return candidate.bestThree;
    default:
      return null;
  }
}
