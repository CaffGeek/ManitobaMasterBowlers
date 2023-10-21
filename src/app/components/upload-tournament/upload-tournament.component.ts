import { TournamentUploadRecord } from '../../models/TournamentUploadRecord.model';
import { Component, EventEmitter, HostListener, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-tournament',
  templateUrl: './upload-tournament.component.html',
  styleUrls: ['./upload-tournament.component.css']
})
export class UploadTournamentComponent {
  @Output() tournamentUploadedEvent = new EventEmitter<TournamentUploadRecord[]>();

  @HostListener('paste', ['$event'])
  onPaste($event: ClipboardEvent) {
    let clipboardData = $event.clipboardData;
    let clipboardText = clipboardData.getData('text');
    let results = this.parseUpload(clipboardText) as TournamentUploadRecord[];
    this.tournamentUploadedEvent.emit(results);
  }

  parseUpload(tsv): TournamentUploadRecord[] {
    let lines = tsv.split(/\r?\n/);
    
    return lines
      .map(line => /(?<Bowler>[a-zA-Z \.]+)\s+(?<Game1>\d{0,3})?\s*(?<Game2>\d{0,3})?\s*(?<Game3>\d{0,3})?\s*(?<Game4>\d{0,3})?\s*(?<Game5>\d{0,3})?\s*(?<Game6>\d{0,3})?\s*(?<Game7>\d{0,3})?\s*(?<Game8>\d{0,3})?/.exec(line))
      .reduce((a, c) => a ? [...a, c.groups] : [c.groups], [])
      .map(x => Object.assign(new TournamentUploadRecord(), x).ensureTypes());
    };
}
