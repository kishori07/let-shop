import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    skip_validateItems: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  Products = [];
  laptops = [];
  television = [];
  mobile = [];
  constructor(
    private service: ShopServiceService,
    private router: Router,
    private Toastr: ToastrService
  ) {}
  // imageName;
  ngOnInit(): void {
    
    this.checkIfCartHasItem();
    this.productByCategory()
  }
  productByCategory() {
    this.service.findAllProducts().subscribe((res) => {
      this.Products = res['data'];
      this.laptops = this.Products.filter((e) => e.category === 3);
      console.log(this.laptops);
      this.television = this.Products.filter((e) => e.category === 2);
      this.mobile = this.Products.filter((e) => e.category === 1);
    });
  }

  checkIfCartHasItem() {
    const hasCart = JSON.parse(sessionStorage.getItem('cartId'));
    const login = JSON.parse(sessionStorage.getItem('token'));
    if (hasCart != undefined && login != undefined) {
      const userId = JSON.parse(sessionStorage.getItem('userId'));

      this.service.getUserById(userId).subscribe((res) => {
        const data = res['data']['cartItems'];

        if (data != undefined) {
          const prodId = data.find((e) => e.Cart == hasCart['productId']);

          if (prodId == undefined) {
            this.service
              .addCartItem({
                productId: hasCart['productId'],
                id: userId,
                quantity: hasCart['quantity'],
              })
              .subscribe((res) => {
                if (res) {
                  this.Toastr.success('Added 1 product to Cart :) !');
                  this.router.navigate([
                    '/cart',
                    hasCart['productId'],
                    { quantity: hasCart['quantity'] },
                  ]);
                }
              });
          }
        }
      });
    } else {
      this.Toastr.success('Welcom to Lets Shop !');
    }
    
  }

  linkImg(fileName) {
    // base_URL returns localhost:3000 or the production URL
    return `http://localhost:3000/public/upload/${fileName}`;
  }
}
