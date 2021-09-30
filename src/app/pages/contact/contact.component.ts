import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor( private fb:FormBuilder,private Toastr:ToastrService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      address:['',Validators.required],
    })
  }

  get cfs() {
    return this.contactForm.controls;
  }
  ContactForms() {
    console.log(this.contactForm.value);
    this.contactForm.reset();
    this.Toastr.info('Thanks for sharing your details, we will contact you soon !')
  }
}
