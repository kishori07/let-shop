import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('screen', { static: true }) screenCanvas: any;
  productId: string;
  productDetails = [];
  allProduct = [];
  quantity: number = 0;
  cartIt: any;
  calculate: number = 0;
  img: string;
  name = [];
  productSum = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ShopServiceService
  ) {}

  ngOnInit(): void {
    this.productsForCheckout();
    this.allProducts();
  }
  allProducts() {
    debugger;
    this.service.findAllProducts().subscribe((res) => {

      this.allProduct = res['data'];
      console.log(this.allProduct);
    });
  }
  placeOrder() {
    this.productSum.push({
      productBrandName: this.name.toString(),
      productQuantity: this.quantity,
      productTotalAmt: this.calculate,
    });
    this.service.checkout(this.productSum);
  }
  productsForCheckout() {
    debugger;
    const userId = JSON.parse(sessionStorage.getItem('userId'));

    if (userId != undefined) {
      this.service.getUserById(userId).subscribe((res) => {
        this.cartIt = res['data']['cartItems'];
        console.log(this.cartIt);
       sessionStorage.setItem('Cart', JSON.stringify(this.cartIt));
        for (let e = 0; e != this.cartIt.length; e++) {
          this.productId = this.cartIt[e].Cart;

          this.service.getProductById(this.productId).subscribe((res) => {
            this.productDetails.push(res['data']);
            this.name.push(
              this.productDetails[e].productBrandName +
                '' +
                this.productDetails[e].productModel
            );
            this.quantity = Number(this.cartIt[e].quan) + Number(this.quantity);
            this.calculate =
              this.calculate +
              this.productDetails[e].productPrice * this.cartIt[e].quan;
          });
        }
      });
    }
  }
}
