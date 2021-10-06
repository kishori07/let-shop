import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';

import { UserModal } from '../Modals/usermodal';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopServiceService {

  public apiUrl = environment.apiUrl;
  public actionListener = new Subject<boolean>();

  constructor(private http: HttpClient,private stripeService: StripeService) { }

  addUsers(User): Observable<UserModal> {
    const Url = this.apiUrl + `user/add-user`;
    return this.http.post<UserModal>(Url, User);
  }

  findUserByEmailId(user): Observable<UserModal> {
    const Url = this.apiUrl + `user/getUserByEmail`;
    return this.http.post<UserModal>(Url, user)

  }
  getUserById(id) {
    const Url = this.apiUrl + `user/getUserById/${id}`;
    return this.http.get(Url);
  }

  getImages() {
    const Url = this.apiUrl + `images`;
    return this.http.get(Url);
  }
  linkImg(fileName) {
    // base_URL returns localhost:3000 or the production URL
    return `${this.apiUrl}/uploads/${fileName}`;
  }
  findAllProducts() {
    const Url = this.apiUrl + `admin/getAllProducts`;
    return this.http.get(Url);
  }

  public get isLoggedIn(): boolean {
    const token = JSON.parse(sessionStorage.getItem("AdminData"));

    return token == " " || token == null ? false : true;
  }
  getProductById(id) {
    const Url = this.apiUrl + `admin/getProductById/${id}`;
    return this.http.get(Url);
  }
  getAllProducts() {
    const Url = this.apiUrl + `admin/getAllProducts`;
    return this.http.get(Url);
  }

  addCartItem({ productId: productId, id: userId, quantity: quant }) {

    const Url = this.apiUrl + `user/addCartToUser`;
    return this.http.put(Url, { productId: productId, id: userId, quantity: quant });
  }

  removeCartItem(CartItem) {
    console.log(CartItem);
    const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  body: CartItem,
};
    const Url = this.apiUrl + `user/removeCartItem`;
    return this.http.delete(Url, options);
  }

  updateQuantity(CartItem) {
    const Url = this.apiUrl + `user/updateQuantity`;
    return this.http.put(Url,CartItem)

  }
   checkout(products) {
    // Check the server.js tab to see an example implementation
     const Url = this.apiUrl + `user/api/payment`;
    this.http.post(Url,products)
      .pipe(
        switchMap(session => {
          return this.stripeService.redirectToCheckout({ sessionId: session['id'] })
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
        else {

          console.log(result);
        }
      });
   }
  afterPayment(){
    const Url = this.apiUrl + `user/webhook`;
     return this.http.post(Url,{})
  }
}