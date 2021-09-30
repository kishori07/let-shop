import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HomeComponent } from '../pages/home/home.component';
import { ShopPageComponent } from '../pages/shop-page/shop-page.component';
import { SingleProductComponent } from '../pages/single-product/single-product.component';
import { CartComponent } from '../pages/cart/cart.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { CategoryComponent } from '../pages/category/category.component';
import { OthersComponent } from '../pages/others/others.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { SiteBrandingComponent } from '../layout/site-branding/site-branding.component';
import { MainMenuComponent } from '../layout/main-menu/main-menu.component';
import { LoginComponent } from '../access/login/login.component';
import { RegisterComponent } from '../access/register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
// import * as $ from 'jquery';
import { MyaccountComponent } from '../pages/myaccount/myaccount.component';
import { WishListComponent } from '../pages/wish-list/wish-list.component';
import { MaterialModule } from '../material/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [

    UsersComponent,
    HeaderComponent,
    MainMenuComponent,
    FooterComponent,
    HomeComponent,
    ShopPageComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    CategoryComponent,
    OthersComponent,
    ContactComponent,
    SiteBrandingComponent,
    LoginComponent,
    RegisterComponent,
    MyaccountComponent,
    WishListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule,
    FontAwesomeModule,
     ]
})
export class UserModule { }

