import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Products=[];
  laptops = [];
  television = [];
  mobile = [];
  constructor(private service : ShopServiceService) { }

  ngOnInit(): void {
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
}
