import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminUseOnlyService } from '../service/admin-use-only.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css'],
})
export class AdminregisterComponent implements OnInit {
  signUp: FormGroup;
  @ViewChild('fileInput') el: ElementRef;
  url: any;
  file;
  imageUrl: any =
    'https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/bf/4f/45/bf4f454e-f716-386c-26cb-ab89fe939a30/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/600x600wa.png';
  constructor(
    private fb: FormBuilder,
    private adminUseOnly: AdminUseOnlyService,
    private Toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signUp = this.fb.group({
      name: ['', Validators.required],
      mobileno: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      imgUrl: [],
    });
  }

  get sfc() {
    return this.signUp.controls;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(this.file); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.imageUrl = reader.result;
      };
    }
  }
  onSubmit() {
    this.signUp.value.imgUrl = this.file;

    const formValue = this.signUp.value;

    this.adminUseOnly.addNewAdmin(formValue).subscribe((Data) => {
      if (Data) {
        this.Toastr.success('You have successfully signup, Please do login !');
      }
    });

    this.signUp.reset();
    this.signUp.value.imgUrl = this.imageUrl;
  }
}
