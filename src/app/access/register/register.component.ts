import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signUp: FormGroup;
  constructor(
    private fb: FormBuilder,
    private shop: ShopServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUp = this.fb.group({
      name: ['', Validators.required],
      mobileno: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }

  get sfc() {
    return this.signUp.controls;
  }

  onSubmit() {
    const formValue = this.signUp.value;
    this.shop.addUsers(formValue).subscribe((data) => {
      if (data != undefined) {
        alert('You have successfully signup , Please do login !');
      }
    });
    this.router.navigateByUrl('/login');
    this.signUp.reset();
  }
}
