import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/services/auth0.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(private auth: Auth0Service) { }

  ngOnInit(): void {
   

  }
}