import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router} from '@angular/router';

import { slideInAnimation } from './route-animation'
import { RouterHistoryService } from 'src/services/router-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {

  previousPages: string[]= [];
  lastPage: string = "";

  title = 'Quizle';

  constructor(private location: Location,private router: Router, private routerService:RouterHistoryService){
      this.routerService.navigation$.subscribe((page)=> {
        this.previousPages = page;
        this.lastPage = page[page.length-1]
      })
  }
  ngOnInit(): void {
  }

  back_click(){
    this.location.back();
    var mainContent = document.querySelector("html")
    mainContent.classList.add("contrast-white");
    mainContent.classList.remove("contrast-black");
  }
}
