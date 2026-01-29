import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { ApiService } from '@services/api.service';
import { faExclamationTriangle, faInfoCircle, faSquareMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

type LaneDrawBowler = {
  BowlerId: number;
  Name: string;
  Gender: string;
  pinfall: number;
  games: number;
  average: number;
  events: number;
};

@Component({
  selector: 'app-tournament-lane-draw-page',
  templateUrl: './tournament-lane-draw-page.component.html',
  styleUrls: ['./tournament-lane-draw-page.component.css'],
  standalone: false,
})
export class TournamentLaneDrawPageComponent implements OnInit, OnDestroy {
  faExclamationTriangle = faExclamationTriangle;
  faInfoCircle = faInfoCircle;
  faSquareMinus = faSquareMinus;
  faUserPlus = faUserPlus;
  laneCount = 1;
  lanes: { lane: number; bowlers: LaneDrawBowler[] }[] = [];
  notPlaying: LaneDrawBowler[] = [];
  leagueAverages: Record<number, number | null> = {};
  private allBowlers: LaneDrawBowler[] = [];
  private notPlayingIds = new Set<number>();
  private averagesByBowlerId = new Map<number, any>();
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const parentParams$ = this.route.parent?.paramMap;
    if (!parentParams$) {
      return;
    }

    this.routeSub = combineLatest([parentParams$, this.route.paramMap]).subscribe(([parentParams]) => {
      const division = (parentParams.get('division') || '').toLowerCase();
      const season = parentParams.get('season') || '';

      if (!season || !division) {
        this.allBowlers = [];
        this.lanes = [];
        this.notPlaying = [];
        return;
      }

      this.loadDivisionBowlers(season, division);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private loadDivisionBowlers(season: string, division: string): void {
    this.api.memberAverages$().subscribe((averages) => {
      this.averagesByBowlerId = new Map((averages || []).map((row) => [row.BowlerId, row]));
      this.api.bowlerSeason$(season).subscribe((rows) => {
        const filtered = (rows || []).filter((row) => this.matchesDivision(row, division));
        this.allBowlers = filtered.map((row) => this.mergeAverage(row));
        this.notPlayingIds.clear();
        this.refreshNotPlaying();
        this.setDefaultLaneCount(this.allBowlers.length);
        this.buildLanes();
      });
    });
  }

  getMissingGames(row: LaneDrawBowler): number {
    return Math.max(0, 80 - (row.games || 0));
  }

  getLeagueAverage(row: LaneDrawBowler): number | null {
    const value = this.leagueAverages[row.BowlerId];
    return typeof value === 'number' && !Number.isNaN(value) ? value : null;
  }

  setLeagueAverage(row: LaneDrawBowler, value: string): void {
    const parsed = Number(value);
    this.leagueAverages[row.BowlerId] = Number.isFinite(parsed) ? parsed : null;
  }

  promptLeagueAverage(row: LaneDrawBowler): void {
    const current = this.getLeagueAverage(row);
    const result = window.prompt(`Enter league average for ${row.Name}`, current?.toString() || '');
    if (result === null) {
      return;
    }
    this.setLeagueAverage(row, result);
  }

  getMastersAverage(row: LaneDrawBowler): number | null {
    if (!row.games || !row.pinfall) {
      return null;
    }
    if (row.events >= 10) { // TODO: CHAD: Fix this hardcoded 10 
      return this.roundAverage(row.pinfall / row.games);
    }

    const leagueAvg = this.getLeagueAverage(row);
    if (leagueAvg === null) {
      return null;
    }

    const missingGames = this.getMissingGames(row);
    const paddedTotal = row.pinfall + missingGames * leagueAvg;
    const paddedGames = row.games + missingGames;
    if (!paddedGames) {
      return null;
    }
    return this.roundAverage(paddedTotal / paddedGames);
  }

  private setDefaultLaneCount(bowlerCount: number): void {
    if (bowlerCount <= 0) {
      this.laneCount = 2;
      return;
    }

    const target = bowlerCount / 3.5;
    const nearestEven = Math.round(target / 2) * 2;
    this.laneCount = Math.max(2, nearestEven);
    this.buildLanes();
  }

  private buildLanes(): void {
    const count = Math.max(1, Math.floor(this.laneCount || 0));
    const activeBowlers = this.allBowlers.filter((bowler) => !this.notPlayingIds.has(bowler.BowlerId));
    const shuffled = this.shuffle([...activeBowlers]);
    const lanes: { lane: number; bowlers: LaneDrawBowler[] }[] = [];

    for (let lane = 1; lane <= count; lane += 1) {
      lanes.push({ lane, bowlers: [] });
    }

    const targetCounts = this.getTargetLaneCounts(shuffled.length, lanes);

    let laneIndex = 0;
    shuffled.forEach((bowler) => {
      let guard = 0;
      while ((targetCounts.get(lanes[laneIndex].lane) || 0) === lanes[laneIndex].bowlers.length && guard < lanes.length) {
        laneIndex = (laneIndex + 1) % lanes.length;
        guard += 1;
      }
      lanes[laneIndex].bowlers.push(bowler);
      laneIndex = (laneIndex + 1) % lanes.length;
    });

    this.lanes = lanes;
    this.refreshNotPlaying();
  }

  moveToNotPlaying(bowler: LaneDrawBowler, lane: { lane: number; bowlers: LaneDrawBowler[] }): void {
    if (this.notPlayingIds.has(bowler.BowlerId)) {
      return;
    }
    this.notPlayingIds.add(bowler.BowlerId);
    lane.bowlers = lane.bowlers.filter((row) => row.BowlerId !== bowler.BowlerId);
    this.refreshNotPlaying();
  }

  moveToLane(bowler: LaneDrawBowler): void {
    if (!this.notPlayingIds.has(bowler.BowlerId)) {
      return;
    }
    if (!this.lanes.length) {
      this.buildLanes();
    }
    this.notPlayingIds.delete(bowler.BowlerId);
    const minCount = Math.min(...this.lanes.map((lane) => lane.bowlers.length));
    const candidates = this.lanes.filter((lane) => lane.bowlers.length === minCount);
    const oddCandidates = candidates.filter((lane) => lane.lane % 2 === 1);
    const preferred = (oddCandidates.length ? oddCandidates : candidates).sort((a, b) => a.lane - b.lane);
    const targetLane = preferred[0] || null;
    if (targetLane) {
      targetLane.bowlers = [...targetLane.bowlers, bowler];
    }
    this.refreshNotPlaying();
  }

  private refreshNotPlaying(): void {
    this.notPlaying = this.allBowlers
      .filter((bowler) => this.notPlayingIds.has(bowler.BowlerId))
      .sort((a, b) => a.Name.localeCompare(b.Name));
  }

  private getLaneOrder(lanes: { lane: number; bowlers: LaneDrawBowler[] }[]): { lane: number; bowlers: LaneDrawBowler[] }[] {
    return [
      ...lanes.filter((lane) => lane.lane % 2 === 1),
      ...lanes.filter((lane) => lane.lane % 2 === 0),
    ];
  }

  private getTargetLaneCounts(totalBowlers: number, lanes: { lane: number; bowlers: LaneDrawBowler[] }[]): Map<number, number> {
    const count = Math.max(1, lanes.length);
    const base = Math.floor(totalBowlers / count);
    let extra = totalBowlers % count;
    const order = this.getLaneOrder(lanes);
    const targetCounts = new Map<number, number>();

    order.forEach((lane) => {
      const bonus = extra > 0 ? 1 : 0;
      if (extra > 0) {
        extra -= 1;
      }
      targetCounts.set(lane.lane, base + bonus);
    });

    return targetCounts;
  }

  private mergeAverage(row: any): LaneDrawBowler {
    const averages = this.averagesByBowlerId.get(row.BowlerId) || {};
    return {
      BowlerId: row.BowlerId,
      Name: row.Name,
      Gender: row.Gender,
      pinfall: averages.pinfall ?? 0,
      games: averages.games ?? 0,
      average: averages.average ?? 0,
      events: averages.events ?? 0,
    };
  }

  private shuffle(items: LaneDrawBowler[]): LaneDrawBowler[] {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  private matchesDivision(row: any, division: string): boolean {
    if (division === 'tournament') {
      return !!row.TournamentFlag;
    }
    if (division === 'teaching') {
      return !!row.TeachingFlag;
    }
    if (division === 'senior') {
      return !!row.SeniorFlag;
    }
    return false;
  }

  private roundAverage(value: number): number {
    return Math.floor(value);
  }
}
