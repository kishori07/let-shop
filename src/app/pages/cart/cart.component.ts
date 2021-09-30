import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productId: any;
  productDetails = [];
  allProductDetails: [] = [];
  findImages;
  cartItems;
  allProducts = [];
  quantity: number;
  image;
  cartIt = [];
  amt: number;
  amount: any;
  show: boolean = false;
  p = [];
  // images : string ='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.calcapp.net%2Fblog%2F2018%2F04%2F06%2Floading-screen.html&psig=AOvVaw0OOROaauFKzUFeSpVdHct1&ust=1626765032286000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCPj66ZbK7vECFQAAAAAdAAAAABAD.png'
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ShopServiceService,
    private router: Router,
    private Toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.allProduct();
    sessionStorage.removeItem('cartId');
    this.getAllInfo();
  }
  getAllInfo() {
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    if (userId != undefined) {
      this.service.getUserById(userId).subscribe((res) => {
        this.cartIt = res['data']['cartItems'];

        if (this.cartIt.length == 0) {
          this.Toastr.show('Opps!! Your Cart is empty.');
        }
        for (let e of this.cartIt) {
          this.productId = e.Cart;
          this.quantity = e.quan;

          if (this.productId != undefined) {
            this.service.getProductById(this.productId).subscribe((res) => {
              this.productDetails.push(res['data']);

              const k = res['data'].productPrice * this.quantity;
              // console.log(k);
              this.p.push(k);
              // console.log(this.p);
              this.amt = this.p.reduce(function (acc, val) {
                return acc + val;
              }, 0);
              // console.log(this.amt);
            });
          }
        }
      });
    }
  }
  quan(q, i) {
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    const cartItm: {} = {
      productId: i,
      id: userId,
      quantity: q,
    };
    if (q) {
      this.show = true;
      this.service.updateQuantity(cartItm).subscribe((res) => {
        this.cartIt = res['data']['cartItems'];
        this.show = false;
        // this.toAddAmt()
        // const amount = this.productDetails.filter((e) => e.productPrice );
      });
    }
  }

  removeProduct(i) {
    console.log(i)
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    this.productDetails.slice(i);
    const cartItm: {} = {
      productId: i,
      id: userId,
      quantity: this.quantity,
    };
    this.show = true;
    this.service.removeCartItem(cartItm).subscribe((res) => {
      console.log(res);
      this.show = false;
      this.ngOnInit();
    });
    // this.Toastr.info('Oh O.. Your cart is empty !');
  }

  checkOut() {
    // const totalAmount =
    //   Number(this.productDetails[0]['productPrice']) * this.quantity;

    this.router.navigateByUrl('/checkout');
  }

  allProduct() {
    this.service.findAllProducts().subscribe((res) => {
      this.allProducts = res['data'];
      console.log(this.allProducts);
    });
  }

  linkImg(fileName) {
    if (fileName != undefined) {
      // base_URL returns localhost:3000 or the production URL
      return `http://localhost:3000/public/upload/${fileName}`;
    }
  }
}
