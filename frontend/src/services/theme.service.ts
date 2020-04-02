import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Theme } from 'src/models/theme.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ThemeService implements OnInit {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private themes: Theme[] = [];
  public themeSelected: Theme;

  private lien = "http://localhost:9428/api/themes/";

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();

  constructor(private route: ActivatedRoute,private http: HttpClient) {
    
  }

  ngOnInit(){
    this.http.get<Theme[]>(this.lien).subscribe((themes) => {
      console.log("Themerecup :"+themes)
      this.themes = themes;
      this.themes$.next(this.themes);
      this.themeSelected$.next(this.themeSelected)
    });
  }

  getThemeById(themeid: string){
    const urlWithId = this.lien + themeid;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected = theme;
      this.themeSelected$.next(this.themeSelected);
    })
  }
  // getTheme(id: string) {
  //   this.themes.filter((theme) => {
  //     if(theme.id.toString() === id){
  //       this.themeSelected= theme
  //       this.themeSelected$.next(this.themeSelected);
  //     }
  //   });
  // }

  setSelectedTheme(theme: string) {
    const urlWithId = this.lien + theme.toString();
    console.log(urlWithId)
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected = theme[0];
      this.themeSelected$.next(this.themeSelected);
    });
  }
  

  /** DELETE: delete the quiz from the server */
  deleteTheme(selected: string) {
    const url = this.lien+selected.toString(); // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.themes$.next(this.themes)
    this.http.delete(url,header).subscribe(()=> this.setThemesFromUrl())
    
  }

  protected prepareHeader(): object {
    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
   
    return {
        headers: headers
    };
  }

  setThemesFromUrl(){
    this.http.get<Theme[]>(this.lien).subscribe((themes) => {
      this.themes = themes;
      this.themes$.next(this.themes);
    });
    console.log("Les theme: " + this.themes)
  }


  addTheme(theme: Theme): void {
    this.http.post(this.lien,theme).subscribe()
    this.setThemesFromUrl();
    this.themes$.next(this.themes);
  }

  getThemes(id: string) {
    this.http.get<Theme[]>(this.lien+ id).subscribe((themess) => {
      this.themes = themess;
      this.themes$.next(this.themes);
    });
  }
}
