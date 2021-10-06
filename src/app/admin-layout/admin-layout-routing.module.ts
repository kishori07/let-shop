import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from '../Adminlayout/add-products/add-products.component';
import { AdminregisterComponent } from '../Adminlayout/adminregister/adminregister.component';
import { ControlsComponent } from '../Adminlayout/controls/controls.component';
import { SigninComponent } from '../Adminlayout/signin/signin.component';
import { AuthGuard } from '../guards/auth.guard';
import { DoubleauthGuard } from '../guards/doubleauth.guard';
import { AdminLayoutComponent } from './admin-layout.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'adminHome', pathMatch: 'full' },
      // canActivate: [DoubleauthGuard]
      // , canActivate: [AuthGuard]
      { path: 'loginIn', component: SigninComponent },
      { path: 'registerIn', component: AdminregisterComponent},
      { path: 'adminHome', component: ControlsComponent},
      { path : 'addproducts', component:AddProductsComponent}
    ]
  // {
  //   path: 'admin',
  //   component: ,
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: '',
    //     // canActivateChild: [AuthGuard],
    //     children: [

    //       { path: 'admin-layout', component: AdminLayoutComponent},
    //       // { path: '', component: AdminDashboardComponent }
    //     ]
    //   }
    // ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
