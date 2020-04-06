import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import {RouterOutlet} from '@angular/router';
import { slideInAnimation } from './route-animation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    slideInAnimation
  ]
})
export class AppComponent {

  title = 'Quizle';

  constructor(private _location: Location,private router: Router){
    
  }

  back_click(){
    this._location.back();
    var mainContent = document.querySelector("html")
    mainContent.classList.add("contrast-white");
    mainContent.classList.remove("contrast-black");
  }

}
