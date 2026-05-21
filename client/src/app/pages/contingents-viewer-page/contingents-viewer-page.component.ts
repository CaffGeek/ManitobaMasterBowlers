import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ContingentGroupRecord,
  ContingentResponseRecord,
  ContingentSlotRecord,
} from '@models/ContingentRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { ApiService } from '@services/api.service';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { ToastService } from '@services/toast.service';
import { combineLatest } from 'rxjs';

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
  canEditTournament$ = this.permissions.checkPermission(PERMISSION.EDIT_TOURNAMENT);

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
      this.selectedSeason = season;

      if (!this.seasons.length) {
        this.loadSeasons();
        return;
      }

      if (season && season !== this.loadedSeason) {
        this.loadContingents();
      }
    });
  }

  onSeasonChange(): void {
    if (!this.selectedSeason) {
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

  sortedFilledSlots(slots: ContingentSlotRecord[]): ContingentSlotRecord[] {
    return [...slots]
      .filter((slot) => !!slot.bowlerId && !!slot.bowler)
      .sort((a, b) => a.bowler.localeCompare(b.bowler));
  }

  private loadSeasons(): void {
    this.api.seasons$().subscribe({
      next: (seasons) => {
        this.seasons = (seasons || []).sort((a, b) => (b.SeasonCode || '').localeCompare(a.SeasonCode || ''));
        if (!this.seasons.length) {
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

  private cloneGroups(groups: ContingentGroupRecord[]): ContingentGroupRecord[] {
    return (groups || []).map((group) => ({
      ...group,
      singles: group.singles ? { ...group.singles } : null,
      coach: group.coach ? { ...group.coach } : null,
      team: (group.team || []).map((slot) => ({ ...slot })),
      candidates: (group.candidates || []).map((candidate) => ({ ...candidate })),
    }));
  }
}
