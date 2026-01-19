import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@services/api.service';
import { BowlerRecord } from '@models/BowlerRecord';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.css'],
  standalone: false,
})
export class TournamentEditorComponent implements OnChanges {
  @Input() tournament: number;
  @Input() results: TournamentResultsRecord[] = [];
  bowlers: BowlerRecord[];
  private tempBowlerId = -1;
  filteredBowlerNames: string[] = [];

  constructor(
    private api: ApiService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.api.bowlers$().subscribe((bowlers) => {
      this.bowlers = bowlers;

      this.dataSource.data = changes.results.currentValue
        .map((x,i) => {
          x.BowlerId = this.bowlers.find(b => b.Name === x.Bowler)?.ID || (-i);
          x.IgnoreForAverage = !!x.IgnoreForAverage;
          return x;
        });
    });
  }

  displayedColumns: string[] = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Average', 'Scratch', 'POA', 'IgnoreForAverage', 'Actions'];
  dataSource = new MatTableDataSource(this.results);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property.toLocaleLowerCase()) {
        case 'scratch': return item.scratch();
        case 'poa': return item.poa();
        default: return item[property];
      }
    };
  }

  onBowlerNameChange(row: TournamentResultsRecord) {
    this.filteredBowlerNames = this.buildBowlerSuggestions(row?.Bowler || '');

    if (!row?.Bowler || !this.bowlers?.length) {
      return;
    }

    const match = this.bowlers.find((bowler) => bowler.Name === row.Bowler);
    if (match) {
      row.BowlerId = match.ID;
      return;
    }

    if (!row.BowlerId || row.BowlerId > 0) {
      row.BowlerId = this.getNextTempBowlerId();
    }
  }

  addRow() {
    const record = new TournamentResultsRecord();
    record.Id = undefined;
    record.TournamentId = this.tournament;
    record.BowlerId = this.getNextTempBowlerId();
    record.Bowler = '';
    record.Game1 = 0;
    record.Game2 = 0;
    record.Game3 = 0;
    record.Game4 = 0;
    record.Game5 = 0;
    record.Game6 = 0;
    record.Game7 = 0;
    record.Game8 = 0;
    record.Average = 0;
    record.IgnoreForAverage = false;
    record.ensureTypes();

    this.results = [...this.results, record];
    this.dataSource.data = this.results;
  }

  removeRow(index: number) {
    if (!window.confirm('Remove this bowler from the results?')) {
      return;
    }

    const row = this.results[index];
    this.results = this.results.filter((_row, rowIndex) => rowIndex !== index);
    this.dataSource.data = this.results;

    if (row?.Id && row.Id > 0) {
      this.api.deleteTournamentResults(this.tournament, [row.Id]).subscribe();
    }
  }

  onSubmit() {
    if (!window.confirm("Do you want to save?"))  return;
    
    var data = this.results
      .map((c: TournamentResultsRecord) => {
        let record = {
          TournamentId: this.tournament,
          BowlerId: c.BowlerId,
          Game1: c.Game1,
          Game2: c.Game2,
          Game3: c.Game3,
          Game4: c.Game4,
          Game5: c.Game5,
          Game6: c.Game6,
          Game7: c.Game7,
          Game8: c.Game8,
          BowlerAverage: c.Average,
          IgnoreForAverage: !!c.IgnoreForAverage,
        };

        //If there's an Id, tack it on, so it's an update, not an insert of a new record
        return (!!c.Id) ? { Id: c.Id, ...record } : record;
      });

    this.api.saveTournamentResults(this.tournament, data);
  }

  getErrors(form) {
    return Object.keys(form.controls).map(key => {
      const errors = form.controls[key].errors;
      return errors;
    }).filter(x => !!x);
  }

  private getNextTempBowlerId(): number {
    const existing = this.results.map((row) => row.BowlerId || 0);
    const minId = existing.length > 0 ? Math.min(...existing) : 0;
    if (minId < this.tempBowlerId) {
      this.tempBowlerId = minId;
    }
    return this.tempBowlerId--;
  }

  private buildBowlerSuggestions(input: string): string[] {
    if (!this.bowlers?.length) {
      return [];
    }

    const term = input.trim().toLowerCase();
    const blockedSuffixes = ['- g', '(g)'];
    const isBlocked = (name: string) => {
      const lower = name.toLowerCase();
      return blockedSuffixes.some((suffix) => lower.endsWith(suffix)) || lower.includes('guest');
    };

    const matches = this.bowlers
      .map((bowler) => bowler.Name)
      .filter((name) => !isBlocked(name))
      .filter((name) => {
        if (!term) {
          return true;
        }

        const lower = name.toLowerCase();
        if (lower.startsWith(term)) {
          return true;
        }

        return lower
          .split(/\s+/)
          .some((part) => part.startsWith(term));
      })
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const aStarts = term ? aLower.startsWith(term) : false;
        const bStarts = term ? bLower.startsWith(term) : false;
        if (aStarts !== bStarts) {
          return aStarts ? -1 : 1;
        }
        return a.localeCompare(b, 'en', { sensitivity: 'base' });
      });

    return matches.slice(0, 6);
  }
}
