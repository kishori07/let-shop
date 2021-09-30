import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
showFiller = false;
  showHeader: boolean = true;
  
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  
 logout() {
    this.showHeader = false;
    sessionStorage.removeItem('adminToken');
    this._router.navigateByUrl('loginIn');
  }
}
