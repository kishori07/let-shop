import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../access/login/login.component';
import { RegisterComponent } from '../access/register/register.component';
import { CartComponent } from '../pages/cart/cart.component';
import { CategoryComponent } from '../pages/category/category.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { MyaccountComponent } from '../pages/myaccount/myaccount.component';
import { OthersComponent } from '../pages/others/others.component';
import { PagenotfoundComponent } from '../pages/pagenotfound/pagenotfound.component';
import { ShopPageComponent } from '../pages/shop-page/shop-page.component';
import { SingleProductComponent } from '../pages/single-product/single-product.component';
import { WishListComponent } from '../pages/wish-list/wish-list.component';
import { UsersComponent } from './users.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'shop-page', component: ShopPageComponent },
      { path: 'single-product/:id', component: SingleProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'other', component: OthersComponent,},
      { path: 'category', component: CategoryComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'myaccount', component: MyaccountComponent },
      { path: 'wishList', component: WishListComponent},
      { path: '**', component: PagenotfoundComponent, pathMatch: 'full' },
    ],
  }, // { path: '', component: AdminDashboardComponent }
];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
