import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ContingentFinish,
  ContingentGroupRecord,
  ContingentResponseRecord,
  ContingentSlotRecord,
} from '@models/ContingentRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { ApiService } from '@services/api.service';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { ToastService } from '@services/toast.service';
import { combineLatest, forkJoin } from 'rxjs';

type SummaryColumn = {
  key: string;
  label: string;
  type: 'singles' | 'team' | 'combined-singles';
};

type SummaryCellLine = {
  label: string;
  bowlerId: number | null;
  roleLabel?: string;
};

type SummaryCell = {
  lines: SummaryCellLine[];
  finish: string;
};

type SummaryRow = {
  seasonCode: string;
  seasonLabel: string;
  cells: Record<string, SummaryCell>;
};

@Component({
  selector: 'app-contingents-viewer-page',
  templateUrl: './contingents-viewer-page.component.html',
  styleUrls: ['./contingents-viewer-page.component.css'],
  standalone: false,
})
export class ContingentsViewerPageComponent implements OnInit {
  seasons: SeasonRecord[] = [];
  selectedSeason = '';
  private loadedSeason = '';
  groups: ContingentGroupRecord[] = [];
  hasSavedContingent = false;
  isLoading = false;
  isSummaryMode = false;
  summaryRows: SummaryRow[] = [];
  canEditTournament$ = this.permissions.checkPermission(PERMISSION.EDIT_TOURNAMENT);
  readonly summaryColumns: SummaryColumn[] = [
    { key: 'tournament-singles', label: 'Singles', type: 'combined-singles' },
    { key: 'tournament-women', label: 'Tour Women', type: 'team' },
    { key: 'tournament-men', label: 'Tour Men', type: 'team' },
    { key: 'teaching-women', label: 'Teach Women', type: 'team' },
    { key: 'teaching-men', label: 'Teach Men', type: 'team' },
    { key: 'senior-mixed', label: 'Seniors', type: 'team' },
  ];

  get contentBlockKey(): string {
    return this.selectedSeason ? `contingents-${this.selectedSeason}` : 'contingents';
  }

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toasts: ToastService,
    private permissions: PermissionService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(([params]) => {
      const season = params.get('season') || '';
      this.isSummaryMode = !season;
      this.selectedSeason = season;

      if (!this.seasons.length) {
        this.loadSeasons();
        return;
      }

      if (this.isSummaryMode) {
        this.loadSummary();
        return;
      }

      if (season && season !== this.loadedSeason) {
        this.loadContingents();
      }
    });
  }

  onSeasonChange(): void {
    if (!this.selectedSeason) {
      this.router.navigate(['/contingents']);
      return;
    }

    this.router.navigate(['/contingents', this.selectedSeason]);
  }

  trackByGroup(_index: number, group: ContingentGroupRecord): string {
    return group.key;
  }

  groupByKey(key: string): ContingentGroupRecord | undefined {
    return this.groups.find((group) => group.key === key);
  }

  tournamentSinglesByKey(key: string): ContingentSlotRecord | undefined {
    return this.groupByKey(key)?.singles || undefined;
  }

  finishMarker(finish: ContingentFinish | string | null): string {
    const normalized = this.normalizeFinish(finish);
    switch (normalized) {
      case 1:
        return '\u{1F947}';
      case 2:
        return '\u{1F948}';
      case 3:
        return '\u{1F949}';
      default:
        return normalized ? `${normalized}${this.ordinalSuffix(normalized)}` : '';
    }
  }

  singlesRoleLabel(group: ContingentGroupRecord, slot: ContingentSlotRecord): string {
    if (!group.teamIncludesSingles || slot.position !== 1) {
      return '';
    }

    const finish = this.finishMarker(group.singlesFinish);
    return finish ? `Singles ${finish}` : 'Singles';
  }

  sortedFilledSlots(slots: ContingentSlotRecord[]): ContingentSlotRecord[] {
    return [...slots]
      .filter((slot) => !!slot.bowlerId && !!slot.bowler)
      .sort((a, b) => {
        if (a.position !== b.position) {
          return a.position - b.position;
        }

        return a.bowler.localeCompare(b.bowler);
      });
  }

  summaryCell(row: SummaryRow, column: SummaryColumn): SummaryCell {
    return row.cells[this.summaryCellKey(column)] || { lines: [], finish: '' };
  }

  private summaryRoleLabel(group: ContingentGroupRecord, slot: ContingentSlotRecord): string {
    if (!group.teamIncludesSingles || slot.position !== 1) {
      return '';
    }

    const finish = this.finishMarker(group.singlesFinish);
    return finish ? `(S) ${finish}` : '(S)';
  }

  private loadSeasons(): void {
    this.api.seasons$().subscribe({
      next: (seasons) => {
        this.seasons = (seasons || []).sort((a, b) => (b.SeasonCode || '').localeCompare(a.SeasonCode || ''));
        if (!this.seasons.length) {
          return;
        }

        if (this.isSummaryMode) {
          this.loadSummary();
          return;
        }

        if (!this.selectedSeason || !this.seasons.some((season) => season.SeasonCode === this.selectedSeason)) {
          this.selectedSeason = this.seasons[0].SeasonCode;
          this.router.navigate(['/contingents', this.selectedSeason], { replaceUrl: true });
          return;
        }

        this.loadContingents();
      },
      error: () => {
        this.toasts.show('Could not load seasons.', 'error');
      },
    });
  }

  private loadContingents(): void {
    if (!this.selectedSeason) {
      return;
    }

    this.summaryRows = [];
    this.loadedSeason = this.selectedSeason;
    this.isLoading = true;
    this.api.contingents$(this.selectedSeason).subscribe({
      next: (response: ContingentResponseRecord) => {
        this.groups = this.cloneGroups(response.groups || []);
        this.hasSavedContingent = !!response.hasSavedContingent;
        this.isLoading = false;
      },
      error: () => {
        this.toasts.show('Could not load contingents.', 'error');
        this.isLoading = false;
      },
    });
  }

  private loadSummary(): void {
    this.groups = [];
    this.hasSavedContingent = false;
    this.loadedSeason = '';
    this.isLoading = true;

    const requests = this.seasons.map((season) =>
      this.api.contingents$(season.SeasonCode)
    );

    if (!requests.length) {
      this.summaryRows = [];
      this.isLoading = false;
      return;
    }

    forkJoin(requests).subscribe({
      next: (responses) => {
        this.summaryRows = responses.map((response, index) =>
          this.toSummaryRow(this.seasons[index], response)
        );
        this.isLoading = false;
      },
      error: () => {
        this.toasts.show('Could not load contingents summary.', 'error');
        this.isLoading = false;
      },
    });
  }

  private toSummaryRow(season: SeasonRecord, response: ContingentResponseRecord): SummaryRow {
    const groups = this.cloneGroups(response.groups || []);
    const byKey = new Map(groups.map((group) => [group.key, group]));
    const cells: Record<string, SummaryCell> = {};

    this.summaryColumns.forEach((column) => {
      if (column.type === 'combined-singles') {
        const singlesLines: SummaryCellLine[] = [];
        const tournamentWomen = byKey.get('tournament-women');
        const tournamentMen = byKey.get('tournament-men');

        if (tournamentWomen?.singles?.bowler) {
          const finish = this.finishMarker(tournamentWomen.singlesFinish);
          singlesLines.push({
            label: tournamentWomen.singles.bowler,
            bowlerId: tournamentWomen.singles.bowlerId ?? null,
            roleLabel: finish || undefined,
          });
        }

        if (tournamentMen?.singles?.bowler) {
          const finish = this.finishMarker(tournamentMen.singlesFinish);
          singlesLines.push({
            label: tournamentMen.singles.bowler,
            bowlerId: tournamentMen.singles.bowlerId ?? null,
            roleLabel: finish || undefined,
          });
        }

        cells[this.summaryCellKey(column)] = {
          lines: singlesLines,
          finish: '',
        };
        return;
      }

      const group = byKey.get(column.key);
      if (!group) {
        cells[this.summaryCellKey(column)] = { lines: [], finish: '' };
        return;
      }

      if (column.type === 'singles') {
        const singles = group.singles;
        cells[this.summaryCellKey(column)] = {
          lines: singles?.bowler ? [{ label: singles.bowler, bowlerId: singles.bowlerId ?? null }] : [],
          finish: this.finishMarker(group.singlesFinish),
        };
        return;
      }

      const teamSlots = this.sortedFilledSlots(group.team);
      const lines: SummaryCellLine[] = teamSlots.map((slot) => ({
        label: slot.bowler,
        bowlerId: slot.bowlerId ?? null,
        roleLabel: this.summaryRoleLabel(group, slot),
      }));

      if (group.coach?.bowler) {
        lines.push({
          label: group.coach.bowler,
          bowlerId: group.coach.bowlerId ?? null,
          roleLabel: '(C)',
        });
      }

      cells[this.summaryCellKey(column)] = {
        lines,
        finish: this.finishMarker(group.teamFinish),
      };
    });

    return {
      seasonCode: season.SeasonCode,
      seasonLabel: this.summarySeasonLabel(season),
      cells,
    };
  }

  private summarySeasonLabel(season: SeasonRecord): string {
    return season.SeasonDesc || season.SeasonCode;
  }

  private summaryCellKey(column: SummaryColumn): string {
    return `${column.key}:${column.type}`;
  }

  private cloneGroups(groups: ContingentGroupRecord[]): ContingentGroupRecord[] {
    return (groups || []).map((group) => ({
      ...group,
      singlesFinish: this.normalizeFinish(group.singlesFinish),
      teamFinish: this.normalizeFinish(group.teamFinish),
      singles: group.singles ? { ...group.singles } : null,
      coach: group.coach ? { ...group.coach } : null,
      team: (group.team || []).map((slot) => ({ ...slot })),
      candidates: (group.candidates || []).map((candidate) => ({ ...candidate })),
    }));
  }

  private normalizeFinish(finish: ContingentFinish | string | null | undefined): ContingentFinish | null {
    const numeric = Number(finish);
    if (!Number.isInteger(numeric) || numeric < 1 || numeric > 8) {
      return null;
    }

    return numeric as ContingentFinish;
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
