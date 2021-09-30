import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { AdminUseOnlyService } from '../service/admin-use-only.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shopS: AdminUseOnlyService,
    private auth: Auth0Service,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get sfc() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    const Value = this.signUpForm.value;
    this.auth.loginAdmin(Value);
    this.signUpForm.reset();
  }
}
