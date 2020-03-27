import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Quizle';

  constructor(private _location: Location,private router: Router){
    
  }

  back_click(){
    this._location.back();
  }

}
