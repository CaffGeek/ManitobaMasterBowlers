import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BowlerRecord } from '@models/BowlerRecord';
import { NationalAppearanceRecord } from '@models/NationalAppearanceRecord';
import { ApiService } from '@services/api.service';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest, filter, map, switchMap, takeUntil } from 'rxjs';

type MedalLink = {
  icon: string;
  seasonCode: string;
  title: string;
};

type MedalRow = {
  icon: string;
  label: string;
  links: MedalLink[];
};

@Component({
  selector: 'app-bowler-page',
  templateUrl: './bowler-page.component.html',
  styleUrls: ['./bowler-page.component.css'],
  standalone: false,
})
export class BowlerPageComponent implements OnInit, OnDestroy {
  data: BowlerRecord;
  canEditBowler$: Observable<boolean>;
  isEditingName = false;
  editName = '';
  medalRows: MedalRow[] = [];
  private bowler = 0;
  private destroy$ = new Subject<void>();

  faPen = faPen;
  faCheck = faCheck;
  faXmark = faXmark;

  constructor(
    private api: ApiService,
    private permissions: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.canEditBowler$ = this.permissions.checkPermission(PERMISSION.EDIT_BOWLER);

    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('bowler'))),
        filter((bowlerId) => !!bowlerId),
        switchMap((bowlerId) => {
          this.bowler = bowlerId;
          return combineLatest([
            this.api.bowlers$(),
            this.api.nationalAppearances$(bowlerId),
          ]);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(([bowlers, appearances]) => {
        const requestedBowler = bowlers.find((x) => x.ID == this.bowler) || new BowlerRecord();
        const effectiveBowlerId = requestedBowler.EffectiveBowlerId || requestedBowler.ID;

        if (effectiveBowlerId && effectiveBowlerId !== this.bowler) {
          this.router.navigate(['/bowlers', effectiveBowlerId], { replaceUrl: true });
          return;
        }

        this.data = requestedBowler;
        this.medalRows = this.buildMedalRows(appearances || []);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startEditName() {
    this.editName = this.data?.Name || '';
    this.isEditingName = true;
  }

  cancelEditName() {
    this.isEditingName = false;
    this.editName = '';
  }

  saveName() {
    const name = (this.editName || '').trim();
    if (!name || !this.data?.ID) {
      return;
    }

    this.api.updateBowlerName(this.data.ID, name).subscribe(() => {
      this.data.Name = name;
      this.isEditingName = false;
    });
  }

  private buildMedalRows(appearances: NationalAppearanceRecord[]): MedalRow[] {
    return [
      { icon: '🥇', label: 'Gold', links: this.medalLinks(appearances, 1) },
      { icon: '🥈', label: 'Silver', links: this.medalLinks(appearances, 2) },
      { icon: '🥉', label: 'Bronze', links: this.medalLinks(appearances, 3) },
    ].filter((row) => row.links.length > 0);
  }

  private medalLinks(appearances: NationalAppearanceRecord[], finish: 1 | 2 | 3): MedalLink[] {
    return appearances
      .filter((appearance) => Number(appearance.Finish) === finish)
      .map((appearance) => ({
        icon: this.medalIcon(finish),
        seasonCode: appearance.SeasonCode,
        title: `${this.medalSeasonLabel(appearance)} ${appearance.GroupLabel} - ${appearance.EntryType}`,
      }));
  }

  private medalIcon(finish: 1 | 2 | 3): string {
    switch (finish) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      default:
        return '🥉';
    }
  }

  private medalSeasonLabel(appearance: NationalAppearanceRecord): string {
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

    return appearance.SeasonCode;
  }
}
