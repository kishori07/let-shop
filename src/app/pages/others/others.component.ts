import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  productId: any;
  quantity: any;
  CartItem = [];
  constructor(private _service:ShopServiceService) { }

  ngOnInit(): void {
    debugger;
  this.clearCart()

  }

  clearCart() {
    this.CartItem = JSON.parse(sessionStorage.getItem('Cart'));
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    if (this.CartItem.length > 0) {
      for (let e of this.CartItem) {
      debugger;
      this.productId = e.Cart;
      this.quantity = e.quan;

      const CartItm: {} = {
        productId: this.productId,
        id: userId,
        quantity : this.quantity
      }
      console.log(CartItm);
      this._service.removeCartItem(CartItm).subscribe((res) => {
        console.log(res);
        // this.ngOnInit();
      })
    }
    }
    else {
      window.location.reload();
    }

}

}
