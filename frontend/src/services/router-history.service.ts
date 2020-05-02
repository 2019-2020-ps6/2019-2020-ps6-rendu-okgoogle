import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationError } from '@angular/router';

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
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger == "popstate") {
          this.navigation.pop();
          this.navigation$.next(this.navigation);
        }
        else {
          this.previousUrl = this.router.url.split('/')[1];
          var title = '';
          switch (this.previousUrl) {

            //gestion partie accueilli (traitement alzheimer)
            case 'theme-list':
              title = 'à la liste de thèmes';
              break;
            case 'user-list':
              title = "à la liste d'utilisateurs";
              break;
            case 'quiz-list':
              title = 'à la liste de quiz';
              break;

            //Gestion partie admin
            case 'main-admin':
              title = "à la page d'accueil personnel santé";
              break;
            case 'theme-edit':
              title = "à la page création de quiz";
              break;
            case 'create-theme':
              title = "à la page création de thème";
              break;
            case 'user-stat':
              title = "à la page statistiques";
              break;
            default:
              title = "à la page précedente";
              break;
          }
          this.navigation.push(title);
          this.navigation$.next(this.navigation);
        }
      } else if (event instanceof NavigationError) {
        // Present error to user
        console.log(event.error);
      }
    });
  }
  ngOnInit() {

  }

}

