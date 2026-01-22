import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { SeasonRecord } from '@models/SeasonRecord';
import { TournamentRecord } from '@models/TournamentRecord';
import { Division } from '@models/types/Division';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { Observable, of, switchMap } from 'rxjs';

type EditableTournament = TournamentRecord & { isNew?: boolean };

@Component({
  selector: 'app-schedule-edit-page',
  templateUrl: './schedule-edit-page.component.html',
  styleUrls: ['./schedule-edit-page.component.css'],
  standalone: false,
})
export class ScheduleEditPageComponent implements OnInit {
  seasons: SeasonRecord[] = [];
  selectedSeason = '';
  tournaments: EditableTournament[] = [];
  locationOptions: string[] = [];
  sortKey: keyof TournamentRecord = 'TournamentDetails';
  sortDir: 'asc' | 'desc' = 'asc';

  canCreateSeason$: Observable<boolean>;

  divisions: Division[] = ['Tournament', 'Teaching', 'Senior'];

  faSave = faSave;
  faPlus = faPlus;

  constructor(
    private api: ApiService,
    private permissions: PermissionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.canCreateSeason$ = this.permissions.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return of(false);
        }
        return this.permissions.checkPermission(PERMISSION.CREATE_SEASON);
      })
    );
  }

  ngOnInit(): void {
    this.selectedSeason = this.route.snapshot.paramMap.get('season') || '';
    this.loadSeasons();
  }

  loadSeasons() {
    this.api.seasons$().subscribe((seasons) => {
      this.seasons = (seasons || []).sort((a, b) =>
        (b.SeasonCode || '').localeCompare(a.SeasonCode || '')
      );
      if (this.seasons.length === 0) {
        return;
      }

      const seasonExists = this.seasons.some((s) => s.SeasonCode === this.selectedSeason);
      if (!seasonExists) {
        this.selectedSeason = this.seasons[0].SeasonCode;
        this.router.navigate(['/schedule/edit', this.selectedSeason], { replaceUrl: true });
      }

      this.loadTournaments();
    });
  }

  onSeasonChange() {
    if (!this.selectedSeason) {
      return;
    }
    this.router.navigate(['/schedule/edit', this.selectedSeason]);
    this.loadTournaments();
  }

  loadTournaments() {
    if (!this.selectedSeason) {
      this.tournaments = [];
      return;
    }

    this.api.tournaments$().subscribe((rows) => {
      const allRows = rows || [];
      this.locationOptions = Array.from(
        new Set(
          allRows
            .map((t) => (t.TournamentLocation || '').trim())
            .filter((val) => !!val)
        )
      ).sort((a, b) => a.localeCompare(b));

      this.tournaments = allRows
        .filter((t) => t.SeasonCode === this.selectedSeason)
        .sort((a, b) => (a.TournamentNumber || 0) - (b.TournamentNumber || 0))
        .map((row) => Object.assign(new TournamentRecord(), row));
    });
  }

  createNextSeason() {
    if (!this.seasons.length) {
      return;
    }

    const latest = this.seasons[0];
    const nextCode = this.incrementSeasonCode(latest.SeasonCode);
    const nextDesc = this.incrementSeasonDesc(latest.SeasonDesc);

    if (!nextCode || !nextDesc) {
      return;
    }

    this.api.createSeason(nextCode, nextDesc).subscribe(() => {
      this.selectedSeason = nextCode;
      this.router.navigate(['/schedule/edit', nextCode], { replaceUrl: true });
      this.loadSeasons();
    });
  }

  addTournamentRow() {
    if (!this.selectedSeason) {
      return;
    }

    const row: EditableTournament = Object.assign(new TournamentRecord(), {
      Id: undefined,
      SeasonCode: this.selectedSeason,
      Division: 'Tournament',
      TournamentNumber: null,
      TournamentLocation: '',
      TournamentDetails: '',
      isNew: true,
    });

    this.tournaments = [...this.tournaments, row];
  }

  setSort(key: keyof TournamentRecord) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      return;
    }

    this.sortKey = key;
    this.sortDir = 'asc';
  }

  sortedTournaments(): EditableTournament[] {
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return [...this.tournaments].sort((a, b) => {
      const aVal = a[this.sortKey];
      const bVal = b[this.sortKey];

      if (this.sortKey === 'TournamentDetails') {
        const aDate = a.date?.() ? a.date().valueOf() : 0;
        const bDate = b.date?.() ? b.date().valueOf() : 0;
        return (aDate - bDate) * dir;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * dir;
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * dir;
      }

      return 0;
    });
  }

  saveTournament(row: EditableTournament) {
    const payload: Partial<TournamentRecord> = {
      SeasonCode: row.SeasonCode,
      Division: row.Division,
      TournamentNumber: row.TournamentNumber,
      TournamentLocation: row.TournamentLocation,
      TournamentDetails: row.TournamentDetails,
    };

    if (!row.Id) {
      this.api.createTournament(payload).subscribe((result: any) => {
        row.Id = result?.Id;
        row.isNew = false;
      });
      return;
    }

    this.api.updateTournament(row.Id, payload).subscribe();
  }

  removeTournament(row: EditableTournament) {
    if (!row.Id) {
      this.tournaments = this.tournaments.filter((t) => t !== row);
    }
  }

  private incrementSeasonCode(code: string): string {
    const parsed = Number(code);
    if (!Number.isFinite(parsed)) {
      return '';
    }
    return `${parsed + 1}`;
  }

  private incrementSeasonDesc(desc: string): string {
    const match = desc.match(/(\d{4})\s*-\s*(\d{2}|\d{4})/);
    if (!match) {
      return '';
    }

    const start = Number(match[1]);
    const endRaw = match[2];
    if (!Number.isFinite(start)) {
      return '';
    }

    const nextStart = start + 1;

    if (endRaw.length === 2) {
      const endTwo = Number(endRaw);
      if (!Number.isFinite(endTwo)) {
        return '';
      }
      const nextEndTwo = (endTwo + 1) % 100;
      const padded = `${nextEndTwo}`.padStart(2, '0');
      return `${nextStart}-${padded}`;
    }

    const end = Number(endRaw);
    if (!Number.isFinite(end)) {
      return '';
    }
    return `${nextStart}-${end + 1}`;
  }
}
