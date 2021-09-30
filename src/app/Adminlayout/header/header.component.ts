import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
  
export class HeaderComponent implements OnInit {
  showHeader: boolean;
  constructor(private _auth: Auth0Service, private _router: Router) {}

  ngOnInit(): void {
    const logged = JSON.parse(sessionStorage.getItem('adminToken'));

    if (logged != undefined) {
      this.showHeader = true;
      this._router.navigateByUrl('/adminHome');
    } else {
      this.showHeader = false;

      this._router.navigateByUrl('/loginIn');
    }
  }

  logout() {
    this.showHeader = false;
    sessionStorage.removeItem('adminToken');
    this._router.navigateByUrl('loginIn');
  }
}
