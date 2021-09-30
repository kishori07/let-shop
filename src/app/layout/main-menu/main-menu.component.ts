import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {
  showHeader: boolean;
  cartIt = [];
  constructor( private _router: Router, private service: ShopServiceService,private Toastr :ToastrService) { }

  ngOnInit(): void {
    debugger;
    const logged = JSON.parse(sessionStorage.getItem('token'));
    if (logged != undefined) {
      this.showHeader = true;
      // this._router.navigateByUrl('/home');
    }
    else {
      this.showHeader = false;
      // this._router.navigateByUrl('/home');
    }
    this.cartDetail()
  }
  cartDetail() {
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    if (userId != undefined) {
      this.service.getUserById(userId).subscribe((res) => {
        this.cartIt = res['data']['cartItems'].length;
        console.log(this.cartIt)
      });
    }
  }
  OnLogout() {
 this.Toastr.success('You have successsfully logout ! Do visit again !');
  this.showHeader = false;
  sessionStorage.clear();
  window.location.reload()
}
}