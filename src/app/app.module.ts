import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { UserModule } from './user/user.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MaterialModule } from './material/material.module';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxStripeModule } from 'ngx-stripe';
// import { OthersComponent } from './pages/others/others.component';


@NgModule({
  declarations: [AppComponent, PagenotfoundComponent,],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,

    AdminLayoutModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStripeModule.forRoot(
      'pk_test_51JI4zdSJvdpyLvMGyYhkictsgiKzVR73BKthkv3n8ZcKbfnBjbCis6IyEwlMon8rfbcB9DGGiSTvSyZ7xWx3ZH5O00HSk0H7j5'
    ),
    ToastrModule.forRoot({
      maxOpened: 5,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 3000,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
