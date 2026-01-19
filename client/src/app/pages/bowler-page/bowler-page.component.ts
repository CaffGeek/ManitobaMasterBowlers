import { Component, Input, OnInit } from '@angular/core';
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BowlerRecord } from '@models/BowlerRecord';
import { ApiService } from '@services/api.service';
import { PERMISSION, PermissionService } from '@services/permission.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bowler-page',
  templateUrl: './bowler-page.component.html',
  styleUrls: ['./bowler-page.component.css'],
  standalone: false,
})
export class BowlerPageComponent implements OnInit {
  @Input() bowler: number;
  data: BowlerRecord;
  canEditBowler$: Observable<boolean>;
  isEditingName = false;
  editName = '';

  faPen = faPen;
  faCheck = faCheck;
  faXmark = faXmark;

  constructor(
    private api: ApiService,
    private permissions: PermissionService,
  ) {
  }

  ngOnInit(): void {
    this.canEditBowler$ = this.permissions.checkPermission(PERMISSION.EDIT_BOWLER);
    this.api.bowlers$().subscribe((bowlers) => {
      this.data = bowlers
        .filter(x => x.ID == this.bowler)?.[0] || new BowlerRecord();
    });
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
  
}
