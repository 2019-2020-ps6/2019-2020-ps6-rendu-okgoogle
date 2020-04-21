import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHistoryService implements OnInit {

  public navigation: string[] = [];
  public mode: boolean = true;

  public navigation$: BehaviorSubject<string[]> = new BehaviorSubject(this.navigation);

  private previousUrl: string = undefined;

  constructor(private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart ) {
          if(event.restoredState){
            this.navigation.pop();
            this.navigation$.next(this.navigation);
          }
          else{
            this.previousUrl = this.router.url.split('/')[1];
            var title = ''; 
            switch(this.previousUrl) {
              case 'theme-list':
                title = 'à la liste de thèmes';
                break;
              case 'user-list':
                title = "à la liste d'utilisateurs";
                break;
              case 'quiz-list':
                title = 'à la liste de quiz';
                break;
              default:
                title = "à la page précedente";
                break;
            }
            this.navigation.push(title);
            this.navigation$.next(this.navigation);
          }
        }
      });
  }
  ngOnInit(): void {

  }

}

