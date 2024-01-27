import { Component, OnInit } from '@angular/core';
import { PermissionService, PERMISSION } from '@services/permission.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  canViewContentBlocks: boolean = false;

  constructor(
    public permissions: PermissionService,
  ) {
  }

  ngOnInit(): void {
    //TODO: CHAD: can probably move to auth route guard somehow with the permissions???
    this.permissions.checkPermission(PERMISSION.READ_SITEMAP)
      .subscribe((canEdit) => { this.canViewContentBlocks = canEdit });
  }

}
