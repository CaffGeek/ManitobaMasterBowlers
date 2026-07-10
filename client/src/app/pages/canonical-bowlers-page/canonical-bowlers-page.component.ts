import { Component, OnInit } from '@angular/core';
import { BowlerRecord } from '@models/BowlerRecord';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { ToastService } from '@services/toast.service';

type CanonicalGroup = {
  canonical: BowlerRecord;
  aliases: BowlerRecord[];
};

@Component({
  selector: 'app-canonical-bowlers-page',
  templateUrl: './canonical-bowlers-page.component.html',
  styleUrls: ['./canonical-bowlers-page.component.css'],
  standalone: false,
})
export class CanonicalBowlersPageComponent implements OnInit {
  allBowlers: BowlerRecord[] = [];
  canonicalGroups: CanonicalGroup[] = [];
  aliasCandidates: BowlerRecord[] = [];
  canonicalCandidates: BowlerRecord[] = [];

  aliasInput = '';
  canonicalInput = '';
  isLoading = false;
  isSaving = false;

  constructor(private api: ApiService, private toasts: ToastService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadBowlers();
  }

  bowlerOptionLabel(bowler: BowlerRecord): string {
    return `${bowler.Name} (#${bowler.ID})`;
  }

  currentCanonicalLabel(alias: BowlerRecord): string {
    if (!alias.CanonicalBowlerName || !alias.EffectiveBowlerId) {
      return '';
    }

    return `${alias.CanonicalBowlerName} (#${alias.EffectiveBowlerId})`;
  }

  saveMapping(): void {
    const alias = this.resolveBowler(this.aliasInput, this.aliasCandidates);
    if (!alias) {
      this.toasts.show('Choose a valid alias bowler.', 'error');
      return;
    }

    const canonical = this.resolveBowler(this.canonicalInput, this.canonicalCandidates);
    if (!canonical) {
      this.toasts.show('Choose a valid canonical bowler.', 'error');
      return;
    }

    if (alias.ID === canonical.ID) {
      this.toasts.show('Alias and canonical bowler must be different.', 'error');
      return;
    }

    this.isSaving = true;
    this.api.updateBowlerCanonical(alias.ID, canonical.ID).subscribe({
      next: () => {
        this.toasts.show('Canonical mapping saved.', 'success');
        this.aliasInput = '';
        this.canonicalInput = '';
        this.loadBowlers();
      },
      error: () => {
        this.toasts.show('Could not save canonical mapping.', 'error');
        this.isSaving = false;
      },
    });
  }

  clearMapping(alias: BowlerRecord): void {
    this.isSaving = true;
    this.api.updateBowlerCanonical(alias.ID, null).subscribe({
      next: () => {
        this.toasts.show('Canonical mapping cleared.', 'success');
        this.loadBowlers();
      },
      error: () => {
        this.toasts.show('Could not clear canonical mapping.', 'error');
        this.isSaving = false;
      },
    });
  }

  private loadBowlers(): void {
    this.isLoading = true;
    this.api.bowlers$().subscribe({
      next: (bowlers) => {
        this.allBowlers = [...(bowlers || [])].sort((a, b) =>
          (a.Name || '').localeCompare(b.Name || '') || (a.ID || 0) - (b.ID || 0)
        );
        this.rebuildViewModel();
        this.applyPrefillFromQuery();
        this.isLoading = false;
        this.isSaving = false;
      },
      error: () => {
        this.toasts.show('Could not load bowlers.', 'error');
        this.isLoading = false;
        this.isSaving = false;
      },
    });
  }

  private rebuildViewModel(): void {
    const byId = new Map(this.allBowlers.map((bowler) => [bowler.ID, bowler]));
    const protectedCanonicalIds = new Set(
      this.allBowlers
        .filter((bowler) => bowler.CanonicalBowlerId != null)
        .map((bowler) => bowler.CanonicalBowlerId as number)
    );

    this.canonicalGroups = this.allBowlers
      .filter((bowler) => bowler.CanonicalBowlerId == null)
      .map((canonical) => ({
        canonical,
        aliases: this.allBowlers
          .filter((bowler) => bowler.CanonicalBowlerId === canonical.ID)
          .sort((a, b) => (a.Name || '').localeCompare(b.Name || '') || (a.ID || 0) - (b.ID || 0)),
      }))
      .filter((group) => group.aliases.length > 0)
      .sort((a, b) => (a.canonical.Name || '').localeCompare(b.canonical.Name || ''));

    this.aliasCandidates = this.allBowlers
      .filter((bowler) => !protectedCanonicalIds.has(bowler.ID))
      .sort((a, b) => (a.Name || '').localeCompare(b.Name || '') || (a.ID || 0) - (b.ID || 0));

    this.canonicalCandidates = this.allBowlers
      .filter((bowler) => bowler.CanonicalBowlerId == null && byId.has(bowler.ID))
      .sort((a, b) => (a.Name || '').localeCompare(b.Name || '') || (a.ID || 0) - (b.ID || 0));
  }

  private applyPrefillFromQuery(): void {
    const aliasId = Number(this.route.snapshot.queryParamMap.get('aliasId'));
    const canonicalId = Number(this.route.snapshot.queryParamMap.get('canonicalId'));

    if (aliasId) {
      const alias = this.aliasCandidates.find((bowler) => bowler.ID === aliasId)
        || this.allBowlers.find((bowler) => bowler.ID === aliasId);
      if (alias) {
        this.aliasInput = this.bowlerOptionLabel(alias);
      }
    }

    if (canonicalId) {
      const canonical = this.canonicalCandidates.find((bowler) => bowler.ID === canonicalId)
        || this.allBowlers.find((bowler) => bowler.ID === canonicalId);
      if (canonical) {
        this.canonicalInput = this.bowlerOptionLabel(canonical);
      }
    }
  }

  private resolveBowler(value: string, source: BowlerRecord[]): BowlerRecord | undefined {
    const trimmed = (value || '').trim();
    if (!trimmed) {
      return undefined;
    }

    const exactLabel = source.find((bowler) => this.bowlerOptionLabel(bowler) === trimmed);
    if (exactLabel) {
      return exactLabel;
    }

    const exactNameMatches = source.filter((bowler) => (bowler.Name || '').trim() === trimmed);
    return exactNameMatches.length === 1 ? exactNameMatches[0] : undefined;
  }
}
