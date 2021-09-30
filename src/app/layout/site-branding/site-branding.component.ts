import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-site-branding',
  templateUrl: './site-branding.component.html',
  styleUrls: ['./site-branding.component.css']
})
export class SiteBrandingComponent implements OnInit {

  constructor(private service :ShopServiceService) { }

  ngOnInit(): void {
  }
}
