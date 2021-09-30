import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminUseOnlyService } from 'src/app/Adminlayout/service/admin-use-only.service';

import { Auth0Service } from 'src/app/services/auth0.service';
import { ShopServiceService } from 'src/app/services/shop-service.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  productId: string;
  productDetails: [] = [];
  allProductDetails: [] = [];
  findImages;
  Logged;
  imageOdProd;
  cartId;
  firstImage: any;
  quan: any;
  userId: any;
  img: void;
 readMore:boolean = false;
  specId: any;
  display='none'
  specifi = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ShopServiceService,
    private auth: Auth0Service,
    private adminS : AdminUseOnlyService,
    private router: Router,
    private Toasts: ToastrService
  ) {
    this.activatedRoute.params.subscribe((p) => (this.productId = p.id));
  }
  quantity = new FormControl('',[ Validators.required]);

  ngOnInit(): void {
    this.service.getProductById(this.productId).subscribe((res) => {
      this.productDetails = res['data'];
      console.log(this.productDetails);
      this.imageOdProd = this.productDetails['productImage'];
      console.log(this.imageOdProd.length);
      this.img = this.firstImage = this.imageOdProd[0];
      this.specId = this.productDetails["specId"];
      this.adminS.getProductSpecification(this.specId).subscribe((res) => {
        console.log(res);
        this.specifi.push(res["data"]);
        console.log(this.specifi);
    })
    });
   
    this.service.getAllProducts().subscribe((res) => {
      this.allProductDetails = res['data'];
      for (let e of this.allProductDetails) {
        this.findImages = e['productImage'];
      }
    });

    
  } 
  addCart() {
    this.quan = this.quantity.value;
    this.userId = JSON.parse(sessionStorage.getItem('userId'));
    this.Logged = sessionStorage.getItem('token');

    if (this.Logged != undefined) {
      //  sessionStorage.setItem('cart', JSON.stringify(0));
      this.addItem();
      this.router.navigateByUrl('/cart');
    } else {
      this.cartId = { productId: this.productId, quantity: this.quan };
      sessionStorage.setItem('cartId', JSON.stringify(this.cartId));
      ($('#basicModal') as any).modal('show');
      this.Toasts.info('Please do Login !');
      // sessionStorage.setItem('cart', JSON.stringify(1));
    }
  }
  addItem() {
    this.service.getUserById(this.userId).subscribe((res) => {
      const data = res['data']['cartItems'];

      if (data != undefined) {
        const prodId = data.find((e) => e.Cart == this.productId);

        if (prodId == undefined) {
          this.service
            .addCartItem({
              productId: this.productId,
              id: this.userId,
              quantity: this.quan,
            })
            .subscribe((res) => {
              if (res) {
                this.Toasts.success('Added 1 product to Cart :) !');
              }
            });
        }
      } else {
        console.log(data);
      }
    });
  }

  SignUpLogIn() {
    this.router.navigateByUrl('/login');
    // window.location.reload();
  }
  onTab(img) {
    this.img = img;
 }
  linkImg(fileName) {
 
    if (fileName != undefined) {
      // base_URL returns localhost:3000 or the production URL
      return `http://localhost:3000/public/upload/${fileName}`;
    }
  }
  
}
