import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tournament-viewer',
  templateUrl: './tournament-viewer.component.html',
  styleUrls: ['./tournament-viewer.component.css']
})
export class TournamentViewerComponent implements OnChanges {
  @Input() results: any[] = [];

  displayedColumns: string[] = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'POA'];
  dataSource = new MatTableDataSource(this.results);

  @ViewChild(MatSort) sort: MatSort;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes.results.currentValue
      .map((x, i) => { x.ID = i; return x; });// TODO: CHAD: Need to lookup Proper ID
  }
  
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
}
