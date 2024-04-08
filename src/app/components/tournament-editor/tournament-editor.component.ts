import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@services/api.service';
import { BowlerRecord } from '@models/BowlerRecord';
import { TournamentResultsRecord } from '@models/TournamentResultsRecord';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.css']
})
export class TournamentEditorComponent implements OnChanges {
  @Input() tournament: number;
  @Input() results: TournamentResultsRecord[] = [];
  bowlers: BowlerRecord[];

  constructor(
    private api: ApiService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.api.bowlers$().subscribe((bowlers) => {
      this.bowlers = bowlers;

      this.dataSource.data = changes.results.currentValue
        .map((x,i) => { x.BowlerId = this.bowlers.find(b => b.Name === x.Bowler)?.ID || (-i); return x; });
    });
  }

  displayedColumns: string[] = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Average', 'Scratch', 'POA'];
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
}
