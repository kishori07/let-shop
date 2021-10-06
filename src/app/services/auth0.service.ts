import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  public apiUrl = environment.apiUrl;

  public adminListener = new Subject<boolean>();
  public userListener = new Subject<boolean>();
  show = false;
  fullScreen = true;
  template = ``;
  constructor(
    private http: HttpClient,
    private router: Router,
    private Toast: ToastrService
  ) {}
  ngOnInit() {}

  loginUser(UserDetails) {
    this.http.post(this.apiUrl + `user/loginUser`, UserDetails).subscribe(
      (res) => {
        sessionStorage.setItem('userId', JSON.stringify(res['data'][0]['_id']));
        if (res['token']) {
          debugger;
          localStorage.setItem('token', JSON.stringify(res['token']));
          sessionStorage.setItem('token', JSON.stringify(res['token'])); //token here is stored in a local storage

          this.Toast.success('You have Successfully Login !');
          window.location.href = 'http://192.168.100.58/home';
        }
      },
      (err) => {
        this.Toast.warning('Something went wrong ,Please try after some time!');
        console.log(err);
      }
    );
  }

  onClickCustomTemplate() {
    this.show = true;
    this.fullScreen = false;
    this.template = `<div class="loader loader-2">
            <span></span>
            <span></span>
            <span></span>
        </div>`;
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  loginAdmin(UserDetails) {
    this.http
      .post(this.apiUrl + `admin/getAdminByEmail`, UserDetails)
      .subscribe(
        (res) => {
          if (res['token']) {
            sessionStorage.setItem('adminToken', JSON.stringify(res['token'])); //token here is stored in a local storage

            window.location.href = environment.baseUrl + 'adminHome';
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
