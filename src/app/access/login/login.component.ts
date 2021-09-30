import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private shop: ShopServiceService,
    private auth: Auth0Service
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get sfc() {
    return this.login.controls;
  }
  onSubmit() {
    const formValue = this.login.value;
    this.auth.loginUser(formValue);
    this.login.reset();
  }
}
