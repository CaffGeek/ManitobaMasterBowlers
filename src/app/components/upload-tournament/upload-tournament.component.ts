import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { TournamentUploadRecord } from '@models/TournamentUploadRecord';
import { TournamentService } from '@services/tournament.service';

@Component({
  selector: 'app-upload-tournament',
  templateUrl: './upload-tournament.component.html',
  styleUrls: ['./upload-tournament.component.css']
})
export class UploadTournamentComponent {
  @Output() tournamentUploadedEvent = new EventEmitter<TournamentUploadRecord[]>();

  constructor(
    private tournamentService: TournamentService
  ) {

  }

  @HostListener('paste', ['$event'])
  onPaste($event: ClipboardEvent) {
    let clipboardData = $event.clipboardData;
    let clipboardText = clipboardData.getData('text');
    let results = this.tournamentService.parseUpload(clipboardText) as TournamentUploadRecord[];
    this.tournamentUploadedEvent.emit(results);
  }
}
