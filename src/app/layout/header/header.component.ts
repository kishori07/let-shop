import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth0Service } from 'src/app/services/auth0.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean;

  constructor(private _auth: Auth0Service,private _router : Router,private Toastr:ToastrService) {

   }
  
  ngOnInit(): void {
    const logged = JSON.parse(sessionStorage.getItem('token'));
    if (logged != undefined) {
      this.showHeader = true;
      this._router.navigateByUrl('/home');
    }
    else {
      this.showHeader = false;
        this._router.navigateByUrl('/home'); 
      } 
      
  }
OnLogout() {
 this.Toastr.success('You have successsfully logout ! Do visit again !');
  this.showHeader = false;
  sessionStorage.clear();
  window.location.reload()
}
  search(s) {
    console.log(s);
    if (s.length > 5) {
      this._router.navigateByUrl('/shop-page')
    }
  }
}
