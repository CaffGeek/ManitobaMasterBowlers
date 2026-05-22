import { Component, Input, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BowlerResultsRecord } from '@models/BowlerResultsRecord';
import { NationalAppearanceRecord } from '@models/NationalAppearanceRecord';
import { ApiService } from '@services/api.service';
import { combineLatest } from 'rxjs';

type NationalAppearanceDisplayRecord = {
  SeasonCode: string;
  SeasonDesc: string | null;
  label: string;
};

type NationalAppearanceRole = 'Singles' | 'Team' | 'Coach';

@Component({
  selector: 'app-bowler-stats',
  templateUrl: './bowler-stats.component.html',
  styleUrls: ['./bowler-stats.component.css'],
  standalone: false,
})
export class BowlerStatsComponent implements OnInit {
  @Input() bowler: number;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  stats = {
    playingAverage: 0,
    careerAverage: 0,
    wins: 0,
    highGame: 0,
    highSet: 0,
    tournaments: 0,
    games: 0,
    totalPinfall: 0,
    careerAverageTeaching: 0,
    careerAverageTournament: 0,
    careerAverageSeniors: 0,
  };

  showCalc = false;
  showNationalAppearances = false;
  leagueAverageInput: number | null = null;
  masterCalc = {
    tournamentsCount: 0,
    gamesCount: 0,
    pinfall: 0,
    missingEvents: 0,
    paddedPinfall: 0,
    combinedGames: 0,
    combinedAverage: null as number | null,
  };
  nationalAppearances: NationalAppearanceRecord[] = [];

  constructor(
    private api: ApiService,
  ) {
  }
  
  ngOnInit(): void {
    combineLatest([
      this.api.bowlerResults$(this.bowler),
      this.api.memberAverages$(this.bowler),
      this.api.nationalAppearances$(this.bowler),
    ]).subscribe(([data, averages, appearances]) => {
      const results = data
        .sort((a, b) => b.date().valueOf() - a.date().valueOf())

      this.stats.tournaments = results.length;
      this.stats.highSet = results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => Math.max(a, b), 0);
      this.stats.highGame = results.map(x => Math.max(x.Game1, x.Game2, x.Game3, x.Game4, x.Game5, x.Game6, x.Game7, x.Game8)).reduce((a, b) => Math.max(a, b), 0);
      this.stats.wins = results.filter((x) => !!x.WonStars).length;
      this.stats.games = this.countGames(results);
      this.stats.totalPinfall = this.sumGames(results);
      this.stats.careerAverage = Math.trunc(this.stats.totalPinfall / this.stats.games);

      const masterRecord = averages?.[0];
      this.masterCalc.tournamentsCount = masterRecord?.events ?? 0;
      this.masterCalc.gamesCount = masterRecord?.games ?? 0;
      this.masterCalc.pinfall = masterRecord?.pinfall ?? 0;
      this.updateMasterAverage();
      this.nationalAppearances = appearances || [];
    });
  }

  nationalAppearanceLabel(appearance: NationalAppearanceRecord): string {
    if (appearance.EntryType !== 'Team') {
      return `${appearance.GroupLabel} - ${appearance.EntryType}`;
    }

    return appearance.GroupLabel;
  }

  nationalFinishMarker(finish: NationalAppearanceRecord['Finish'] | string): string {
    const normalized = this.normalizeFinish(finish);
    switch (normalized) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return normalized ? `${normalized}${this.ordinalSuffix(normalized)}` : '';
    }
  }

  nationalAppearanceSeasonLabel(appearance: { SeasonCode: string; SeasonDesc: string | null }): string {
    const seasonDesc = appearance.SeasonDesc?.trim();
    if (!seasonDesc) {
      return appearance.SeasonCode;
    }

    const rangeMatch = seasonDesc.match(/((?:19|20)\d{2})\D+(\d{2}|\d{4})$/);
    if (rangeMatch) {
      const startYear = Number(rangeMatch[1]);
      const endPart = rangeMatch[2];

      if (endPart.length === 4) {
        return endPart;
      }

      const startShortYear = startYear % 100;
      const endShortYear = Number(endPart);
      const century = Math.floor(startYear / 100) * 100;
      const endYear = endShortYear < startShortYear
        ? century + 100 + endShortYear
        : century + endShortYear;

      return String(endYear);
    }

    const fullYearMatch = seasonDesc.match(/((?:19|20)\d{2})(?!.*(?:19|20)\d{2})/);
    if (fullYearMatch) {
      return fullYearMatch[1];
    }

    return appearance.SeasonCode;
  }

  get nationalAppearanceCount(): number {
    return this.listedNationalAppearances.length;
  }

  get listedNationalAppearances(): NationalAppearanceDisplayRecord[] {
    const grouped = new Map<string, NationalAppearanceRecord[]>();
    for (const appearance of this.nationalAppearances) {
      const key = this.nationalAppearanceGroupKey(appearance);
      grouped.set(key, [...(grouped.get(key) || []), appearance]);
    }

    return Array.from(grouped.values()).map((group) => this.buildNationalAppearanceDisplay(group));
  }

  onLeagueAverageChange() {
    this.updateMasterAverage();
  }

  private updateMasterAverage() {
    const missingEvents = Math.max(0, 10 - this.masterCalc.tournamentsCount);
    this.masterCalc.missingEvents = missingEvents;
    this.masterCalc.paddedPinfall = this.leagueAverageInput && missingEvents
      ? this.leagueAverageInput * 8 * missingEvents
      : 0;
    this.masterCalc.combinedGames = this.masterCalc.gamesCount + (missingEvents * 8);

    if (missingEvents === 0) {
      this.masterCalc.combinedAverage = Math.trunc(this.masterCalc.pinfall / this.masterCalc.gamesCount);
      this.stats.playingAverage = this.masterCalc.combinedAverage;
      return;
    }

    if (this.leagueAverageInput && this.leagueAverageInput > 0 && this.masterCalc.combinedGames > 0) {
      this.masterCalc.combinedAverage = Math.trunc(
        (this.masterCalc.pinfall + this.masterCalc.paddedPinfall) / this.masterCalc.combinedGames
      );
      this.stats.playingAverage = this.masterCalc.combinedAverage;
    } else {
      this.masterCalc.combinedAverage = null;
      this.stats.playingAverage = null;
    }
  }

  countGames = (results: any[]): number => {
    return results.map(x => 
      (!!x.Game1 ? 1 : 0) + 
      (!!x.Game2 ? 1 : 0) + 
      (!!x.Game3 ? 1 : 0) + 
      (!!x.Game4 ? 1 : 0) + 
      (!!x.Game5 ? 1 : 0) + 
      (!!x.Game6 ? 1 : 0) + 
      (!!x.Game7 ? 1 : 0) + 
      (!!x.Game8 ? 1 : 0))
      .reduce((a, b) => a + b, 0);
  }

  sumGames = (results: any[]): number => {
    return results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => a + b, 0);
  }

  private nationalAppearanceGroupKey(appearance: NationalAppearanceRecord): string {
    return `${appearance.SeasonCode}|${appearance.GroupKey}`;
  }

  private buildNationalAppearanceDisplay(group: NationalAppearanceRecord[]): NationalAppearanceDisplayRecord {
    const roleOrder: NationalAppearanceRole[] = ['Singles', 'Team', 'Coach'];
    const byRole = new Map<NationalAppearanceRole, NationalAppearanceRecord>();

    for (const role of roleOrder) {
      const match = group.find((appearance) => appearance.EntryType === role);
      if (match) {
        byRole.set(role, match);
      }
    }

    const base = byRole.get('Singles') || byRole.get('Team') || byRole.get('Coach') || group[0];
    const labels = roleOrder
      .map((role) => {
        const appearance = byRole.get(role);
        return appearance ? `${role}${this.finishSuffix(appearance.Finish)}` : null;
      })
      .filter((label): label is string => !!label);

    return {
      SeasonCode: base.SeasonCode,
      SeasonDesc: base.SeasonDesc,
      label: labels.length
        ? `${base.GroupLabel} - ${labels.join(', ')}`
        : this.nationalAppearanceLabel(base),
    };
  }

  private finishSuffix(finish: NationalAppearanceRecord['Finish']): string {
    const marker = this.nationalFinishMarker(finish);
    return marker ? ` ${marker}` : '';
  }

  private normalizeFinish(finish: NationalAppearanceRecord['Finish'] | string | null | undefined): NationalAppearanceRecord['Finish'] {
    const numeric = Number(finish);
    if (!Number.isInteger(numeric) || numeric < 1 || numeric > 8) {
      return null;
    }

    return numeric as NationalAppearanceRecord['Finish'];
  }

  private ordinalSuffix(value: number): string {
    if (value % 100 >= 11 && value % 100 <= 13) {
      return 'th';
    }

    switch (value % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
