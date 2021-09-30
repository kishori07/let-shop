import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {

  constructor(private service:ShopServiceService) { }
  Products = [];
  ngOnInit(): void {
    this.productByCategory()
  }
productByCategory() {
      this.service.findAllProducts().subscribe((res) => {
      this.Products = res['data'];
      // this.laptops = this.Products.filter((e) => e.category === 3);
      // console.log(this.laptops);
      // this.television = this.Products.filter((e) => e.category === 2);
      // this.mobile = this.Products.filter((e) => e.category === 1);
    });
}
  linkImg(fileName) {
    // base_URL returns localhost:3000 or the production URL
    return `http://localhost:3000/public/upload/${fileName}`;
  }
}
