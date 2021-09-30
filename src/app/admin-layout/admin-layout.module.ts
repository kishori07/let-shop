import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';

import { HeaderComponent } from '../Adminlayout/header/header.component';
import { FooterComponent } from '../Adminlayout/footer/footer.component';
import { SigninComponent } from '../Adminlayout/signin/signin.component';
import { AdminregisterComponent } from '../Adminlayout/adminregister/adminregister.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsComponent } from '../Adminlayout/controls/controls.component';
import { AddProductsComponent } from '../Adminlayout/add-products/add-products.component';
import { MaterialModule } from '../material/material.module';
import { SpecificationComponent } from '../Adminlayout/specification/specification.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
       HeaderComponent,
        FooterComponent,
        SigninComponent,
    AdminregisterComponent,
        ControlsComponent,
    AddProductsComponent,
    SpecificationComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
      FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminLayoutModule { }
