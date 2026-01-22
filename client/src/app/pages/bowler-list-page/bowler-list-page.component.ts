import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { BowlerRecord } from '@models/BowlerRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type BowlerSeasonRecord = {
  BowlerId: number;
  Name: string;
  Gender: string;
  SeasonYear: string;
  TournamentFlag: boolean;
  TeachingFlag: boolean;
  SeniorFlag: boolean;
};

@Component({
  selector: 'app-bowler-list-page',
  templateUrl: './bowler-list-page.component.html',
  styleUrls: ['./bowler-list-page.component.css'],
  standalone: false,
})
export class BowlerListPageComponent implements OnInit {
  faTrash = faTrash;
  seasons: SeasonRecord[] = [];
  allBowlers: BowlerRecord[] = [];
  seasonBowlers: BowlerSeasonRecord[] = [];
  selectedSeason = '';
  sortKey: keyof BowlerSeasonRecord = 'Name';
  sortDir: 'asc' | 'desc' = 'asc';

  addName = '';
  addGender = 'M';
  addTournament = false;
  addTeaching = false;
  addSenior = false;

  constructor(private api: ApiService, private confirm: ConfirmDialogService) {}

  ngOnInit(): void {
    this.api.seasons$().subscribe((seasons) => {
      this.seasons = (seasons || []).sort((a, b) =>
        (b.SeasonCode || '').localeCompare(a.SeasonCode || '')
      );
      if (!this.selectedSeason && this.seasons.length > 0) {
        this.selectedSeason = this.seasons[0].SeasonCode;
        this.onSeasonChange();
      }
    });

    this.api.bowlers$().subscribe((bowlers) => {
      this.allBowlers = (bowlers || []).sort((a, b) =>
        (a.Name || '').localeCompare(b.Name || '')
      );
    });
  }

  onSeasonChange() {
    if (!this.selectedSeason) {
      this.seasonBowlers = [];
      return;
    }

    this.api.bowlerSeason$(this.selectedSeason).subscribe((rows) => {
      this.seasonBowlers = (rows || [])
        .map((row) => ({
          ...row,
          TournamentFlag: !!row.TournamentFlag,
          TeachingFlag: !!row.TeachingFlag,
          SeniorFlag: !!row.SeniorFlag,
        }))
        .sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
    });
  }

  setSort(key: keyof BowlerSeasonRecord) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      return;
    }

    this.sortKey = key;
    this.sortDir = 'asc';
  }

  sortedSeasonBowlers(): BowlerSeasonRecord[] {
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return [...this.seasonBowlers].sort((a, b) => {
      const aVal = a[this.sortKey];
      const bVal = b[this.sortKey];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * dir;
      }

      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        return (Number(aVal) - Number(bVal)) * dir;
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * dir;
      }

      return 0;
    });
  }

  onFlagChange(row: BowlerSeasonRecord) {
    if (!this.selectedSeason) {
      return;
    }

    this.api
      .updateBowlerSeasonFlags(this.selectedSeason, row.BowlerId, {
        TournamentFlag: !!row.TournamentFlag,
        TeachingFlag: !!row.TeachingFlag,
        SeniorFlag: !!row.SeniorFlag,
      })
      .subscribe();
  }

  onGenderChange(row: BowlerSeasonRecord) {
    const gender = (row.Gender || '').trim();
    if (!gender || !row.BowlerId) {
      return;
    }

    this.api.updateBowlerGender(row.BowlerId, gender).subscribe(() => {
      const allRow = this.allBowlers.find((b) => b.ID === row.BowlerId);
      if (allRow) {
        allRow.Gender = gender;
      }
    });
  }

  removeBowlerFromSeason(row: BowlerSeasonRecord) {
    if (!this.selectedSeason) {
      return;
    }

    this.confirm
      .confirm({
        title: 'Remove bowler',
        message: `Remove ${row.Name} from ${this.selectedSeason}?`,
        confirmText: 'Remove',
      })
      .subscribe((ok) => {
        if (!ok) {
          return;
        }

        this.api.deleteBowlerSeason(this.selectedSeason, row.BowlerId).subscribe(() => {
          this.seasonBowlers = this.seasonBowlers.filter((b) => b.BowlerId !== row.BowlerId);
        });
      });
  }

  addBowlerToSeason() {
    if (!this.selectedSeason) {
      return;
    }

    const name = (this.addName || '').trim();
    if (!name) {
      return;
    }

    const existing = this.allBowlers.find((b) => b.Name === name);
    const payload = {
      bowlerId: existing?.ID,
      name: existing ? undefined : name,
      gender: existing ? undefined : this.addGender,
      TournamentFlag: this.addTournament,
      TeachingFlag: this.addTeaching,
      SeniorFlag: this.addSenior,
    };

    this.api.addBowlerToSeason(this.selectedSeason, payload).subscribe((result: any) => {
      if (result?.bowlerId && !existing) {
        this.allBowlers = [...this.allBowlers, { ID: result.bowlerId, Name: name } as BowlerRecord]
          .sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
      }

      this.onSeasonChange();
      this.resetAddForm();
    });
  }

  private resetAddForm() {
    this.addName = '';
    this.addGender = 'M';
    this.addTournament = false;
    this.addTeaching = false;
    this.addSenior = false;
  }
}
