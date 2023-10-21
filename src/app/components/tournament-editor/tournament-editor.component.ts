import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentUploadRecord } from 'src/app/models/TournamentUploadRecord.model';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.css']
})
export class TournamentEditorComponent implements OnChanges {
  @Input() results: TournamentUploadRecord[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes.results.currentValue;
  }

  displayedColumns: string[] = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'POA'];
  dataSource = new MatTableDataSource(this.results);
  
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'Scratch': return item.scratch();
        default: return item[property];
      }
    };
  }
}
