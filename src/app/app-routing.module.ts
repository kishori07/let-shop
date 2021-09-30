import { UsersComponent } from './user/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule),
    // data: { preload: true }
  },
  {
    path: 'admin-layout',
    loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    // canLoad: [AuthGuard]
  },
  // { path: '',   redirectTo: '/user', pathMatch: 'full' },
  { path: '', redirectTo:'/home' ,pathMatch:'full' },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
