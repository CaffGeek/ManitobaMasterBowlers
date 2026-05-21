import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ContingentCandidateRecord,
  ContingentGroupRecord,
  ContingentResponseRecord,
  ContingentSlotRecord,
  SaveContingentEntryRecord,
} from '@models/ContingentRecord';
import { SeasonRecord } from '@models/SeasonRecord';
import { ApiService } from '@services/api.service';
import { ToastService } from '@services/toast.service';
import { combineLatest } from 'rxjs';

type CoachSeasonBowlerRecord = {
  BowlerId: number;
  Name: string;
};

@Component({
  selector: 'app-contingents-page',
  templateUrl: './contingents-page.component.html',
  styleUrls: ['./contingents-page.component.css'],
  standalone: false,
})
export class ContingentsPageComponent implements OnInit {
  seasons: SeasonRecord[] = [];
  selectedSeason = '';
  private loadedSeason = '';
  groups: ContingentGroupRecord[] = [];
  defaultGroups: ContingentGroupRecord[] = [];
  hasSavedContingent = false;
  isSaving = false;
  isLoading = false;
  coachCandidates: CoachSeasonBowlerRecord[] = [];
  coachInputs: Record<string, string> = {};

  get contentBlockKey(): string {
    return this.selectedSeason ? `contingents-${this.selectedSeason}` : 'contingents';
  }

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toasts: ToastService
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
        this.loadCoachCandidates();
        this.loadContingents();
      }
    });
  }

  onSeasonChange(): void {
    if (!this.selectedSeason) {
      return;
    }

    this.router.navigate(['/contingents', this.selectedSeason, 'edit']);
  }

  resetToDefaults(): void {
    this.groups = this.cloneGroups(this.defaultGroups);
    this.hasSavedContingent = false;
  }

  save(): void {
    if (!this.selectedSeason) {
      return;
    }

    const validationError = this.validateGroups();
    if (validationError) {
      this.toasts.show(validationError, 'error');
      return;
    }

    this.isSaving = true;
    this.api.saveContingents(this.selectedSeason, this.flattenEntries()).subscribe({
      next: () => {
        this.toasts.show('Contingents saved.', 'success');
        this.isSaving = false;
        this.loadContingents();
      },
      error: () => {
        this.toasts.show('Could not save contingents.', 'error');
        this.isSaving = false;
      },
    });
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
          this.router.navigate(['/contingents', this.selectedSeason, 'edit'], { replaceUrl: true });
          return;
        }

        this.loadCoachCandidates();
        this.loadContingents();
      },
      error: () => {
        this.toasts.show('Could not load seasons.', 'error');
      },
    });
  }

  updateSlot(group: ContingentGroupRecord, slot: ContingentSlotRecord, bowlerIdText: string): void {
    const bowlerId = Number(bowlerIdText);
    if (!bowlerId) {
      slot.bowlerId = null;
      slot.bowler = '';
      slot.eventCount = null;
      slot.score = null;
      return;
    }

    const candidate = group.candidates.find((item) => item.bowlerId === bowlerId);
    if (!candidate) {
      return;
    }

    slot.bowlerId = candidate.bowlerId;
    slot.bowler = candidate.bowler;
    slot.eventCount = candidate.eventCount;
    slot.score = this.candidateScore(group, slot, candidate);
  }

  coachListId(group: ContingentGroupRecord): string {
    return `coach-options-${group.key}`;
  }

  coachDisplayValue(group: ContingentGroupRecord): string {
    return this.coachInputs[group.key] || '';
  }

  coachOptionLabel(option: CoachSeasonBowlerRecord): string {
    return `${option.Name} [${option.BowlerId}]`;
  }

  onCoachInputChange(group: ContingentGroupRecord, value: string): void {
    this.coachInputs[group.key] = value;

    if (!group.coach) {
      group.coach = {
        entryType: 'Coach',
        position: 1,
        bowlerId: null,
        bowler: '',
        eventCount: null,
        score: null,
      };
    }

    const trimmed = (value || '').trim();
    if (!trimmed) {
      group.coach.bowlerId = null;
      group.coach.bowler = '';
      group.coach.eventCount = null;
      group.coach.score = null;
      return;
    }

    const matched = this.matchCoachCandidate(trimmed);
    if (!matched) {
      return;
    }

    group.coach.bowlerId = matched.BowlerId;
    group.coach.bowler = matched.Name;
    group.coach.eventCount = null;
    group.coach.score = null;
    this.coachInputs[group.key] = this.coachOptionLabel(matched);
  }

  trackByGroup(_index: number, group: ContingentGroupRecord): string {
    return group.key;
  }

  optionLabel(group: ContingentGroupRecord, slot: ContingentSlotRecord, candidate: ContingentCandidateRecord): string {
    const score = this.candidateScore(group, slot, candidate);
    const label = this.slotCountLabel(group, slot);
    return `${candidate.bowler} (${label}: ${score ?? 'n/a'} | Events: ${candidate.eventCount})`;
  }

  teamLabel(group: ContingentGroupRecord, slot: ContingentSlotRecord): string {
    if (group.teamIncludesSingles && slot.position === 1) {
      return 'Singles';
    }
    return `Qualifier ${slot.position}`;
  }

  candidatesForSlot(group: ContingentGroupRecord, slot: ContingentSlotRecord): ContingentCandidateRecord[] {
    return [...group.candidates]
      .sort((a, b) => {
        const aScore = this.candidateScore(group, slot, a) ?? Number.NEGATIVE_INFINITY;
        const bScore = this.candidateScore(group, slot, b) ?? Number.NEGATIVE_INFINITY;
        if (bScore !== aScore) {
          return bScore - aScore;
        }
        return a.bowler.localeCompare(b.bowler);
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
        this.defaultGroups = this.cloneGroups(response.defaultGroups || []);
        this.hasSavedContingent = !!response.hasSavedContingent;
        this.coachInputs = this.groups.reduce((result, group) => {
          result[group.key] = group.coach?.bowlerId ? `${group.coach.bowler} [${group.coach.bowlerId}]` : '';
          return result;
        }, {} as Record<string, string>);
        this.isLoading = false;
      },
      error: () => {
        this.toasts.show('Could not load contingents.', 'error');
        this.isLoading = false;
      },
    });
  }

  private flattenEntries(): SaveContingentEntryRecord[] {
    const entries: SaveContingentEntryRecord[] = [];

    this.groups.forEach((group) => {
      const singlesBowlerId = group.teamIncludesSingles
        ? (group.team[0]?.bowlerId || null)
        : (group.singles?.bowlerId || null);

      if (singlesBowlerId) {
        entries.push({
          groupKey: group.key,
          division: group.division,
          gender: group.gender,
          entryType: 'Singles',
          position: 1,
          bowlerId: singlesBowlerId,
        });
      }

      if (group.coach?.bowlerId) {
        entries.push({
          groupKey: group.key,
          division: group.division,
          gender: group.gender,
          entryType: 'Coach',
          position: 1,
          bowlerId: group.coach.bowlerId,
        });
      }

      group.team
        .filter((slot) => !!slot.bowlerId)
        .forEach((slot) => {
          entries.push({
            groupKey: group.key,
            division: group.division,
            gender: group.gender,
            entryType: 'Team',
            position: slot.position,
            bowlerId: slot.bowlerId,
          });
        });
    });

    return entries;
  }

  private validateGroups(): string {
    for (const group of this.groups) {
      const seen = new Set<number>();
      const coachInput = (this.coachInputs[group.key] || '').trim();

      if (coachInput && !group.coach?.bowlerId) {
        return `Choose a valid coach from this season's masters for ${group.label}.`;
      }

      if (group.singles?.bowlerId) {
        seen.add(group.singles.bowlerId);
      }

      for (const slot of group.team) {
        if (!slot.bowlerId) {
          return `Select a bowler for every ${group.label} team slot before saving.`;
        }

        const isSinglesDuplicate = group.singles?.bowlerId === slot.bowlerId;
        if (isSinglesDuplicate && !group.teamIncludesSingles) {
          return `${group.label} singles should not also appear on the team by default.`;
        }

        if (seen.has(slot.bowlerId) && !(group.teamIncludesSingles && isSinglesDuplicate)) {
          return `${group.label} has duplicate team selections.`;
        }

        seen.add(slot.bowlerId);
      }

      if (!group.teamIncludesSingles && group.singles && !group.singles.bowlerId) {
        return `Select a singles representative for ${group.label}.`;
      }

      if (group.teamIncludesSingles && !group.team[0]?.bowlerId) {
        return `Select qualifier 1 for ${group.label}.`;
      }
    }

    return '';
  }

  private cloneGroups(groups: ContingentGroupRecord[]): ContingentGroupRecord[] {
    return (groups || []).map((group) => ({
      ...group,
      singles: group.singles ? { ...group.singles } : null,
      coach: group.coach
        ? { ...group.coach }
        : {
            entryType: 'Coach',
            position: 1,
            bowlerId: null,
            bowler: '',
            eventCount: null,
            score: null,
          },
      team: (group.team || []).map((slot) => ({ ...slot })),
      candidates: (group.candidates || []).map((candidate) => ({ ...candidate })),
    }));
  }

  private slotScoreCount(group: ContingentGroupRecord, slot: ContingentSlotRecord): number {
    if (group.division === 'Senior') {
      return slot.entryType === 'Singles' || (group.teamIncludesSingles && slot.position === 1) ? 4 : 3;
    }

    return slot.entryType === 'Singles' || (group.teamIncludesSingles && slot.position === 1) ? 5 : 4;
  }

  private candidateScore(
    group: ContingentGroupRecord,
    slot: ContingentSlotRecord,
    candidate: ContingentCandidateRecord
  ): number | null {
    switch (this.slotScoreCount(group, slot)) {
      case 5:
        return candidate.bestFive;
      case 4:
        return candidate.bestFour;
      case 3:
        return candidate['bestThree'] ?? null;
      default:
        return null;
    }
  }

  private slotCountLabel(group: ContingentGroupRecord, slot: ContingentSlotRecord): string {
    switch (this.slotScoreCount(group, slot)) {
      case 5:
        return '5/5';
      case 4:
        return group.division === 'Senior' ? '4/4' : '4/5';
      case 3:
        return '3/4';
      default:
        return '';
    }
  }

  private candidateEligibleForCount(candidate: ContingentCandidateRecord, count: number): boolean {
    switch (count) {
      case 5:
        return candidate.eligibleSingles;
      case 4:
        return candidate.bestFour !== null;
      case 3:
        return candidate['bestThree'] !== null;
      default:
        return false;
    }
  }

  private loadCoachCandidates(): void {
    if (!this.selectedSeason) {
      this.coachCandidates = [];
      return;
    }

    this.api.bowlerSeason$(this.selectedSeason).subscribe({
      next: (rows) => {
        this.coachCandidates = (rows || [])
          .map((row) => ({
            BowlerId: row.BowlerId,
            Name: row.Name,
          }))
          .filter((row) => !!row.BowlerId && !!row.Name)
          .sort((a, b) => a.Name.localeCompare(b.Name));
      },
      error: () => {
        this.coachCandidates = [];
        this.toasts.show('Could not load coach candidates.', 'error');
      },
    });
  }

  private matchCoachCandidate(value: string): CoachSeasonBowlerRecord | undefined {
    const idMatch = value.match(/\[(\d+)\]\s*$/);
    if (idMatch) {
      const bowlerId = Number(idMatch[1]);
      return this.coachCandidates.find((candidate) => candidate.BowlerId === bowlerId);
    }

    const normalized = value.trim().toLowerCase();
    return this.coachCandidates.find((candidate) => candidate.Name.trim().toLowerCase() === normalized);
  }
}
