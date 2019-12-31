import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  pageTitle :string ="Welcome!!"
  imageWidth: number = 1000;
  imageHeight: number = 450;
  constructor() { }

  ngOnInit() {
  }

}
