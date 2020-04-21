
import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHistoryService {
  public currentPageTitle$: BehaviorSubject<string>= new BehaviorSubject<string>('');
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  constructor(private router: Router) {
    this.previousUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       const title = ''; 
       switch(this.previousUrl) {
           case '/quiz-list':
             title = 'List of quizzes';
             break;
           case '/edit-quiz':
             title = 'Edit quiz';
             break;
        }
         this.currentPageTitle$.next(title);
         this.previousUrl =  this.currentUrl;
         this.currentUrl = event.url;
      }
    });
  }
}