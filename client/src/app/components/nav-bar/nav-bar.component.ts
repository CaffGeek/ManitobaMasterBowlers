import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false,
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {
  }

  ngOnInit() {
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    const returnTo = `${this.doc.location.origin}${env.appBasePath || ''}`;
    this.auth.logout({ logoutParams: { returnTo } });
  }
}
