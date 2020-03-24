import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
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

  constructor(private http: HttpClient) {
    this.setThemesFromUrl();
  }

  setSelectedTheme(theme: Theme) {
    console.log("le theme est select: " + theme.name)
    // const urlWithId = this.lien + theme.id.toString();
    // this.http.get<Theme>(urlWithId).subscribe((theme) => {
    //   this.themeSelected = theme;
    //   this.themeSelected$.next(theme);
    // });
    this.themeSelected = theme;
    console.log(this.themeSelected)
  }
  

  /** DELETE: delete the quiz from the server */
  deleteTheme (): Observable<{}> {
    const url = this.lien+this.themeSelected.id.toString(); // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.themes$.next(this.themes)
    return this.http.delete(url,header)
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

  getTheme(id: string) {
    this.themes.filter((theme) => {
      if(theme.id.toString() === id){
        this.themeSelected= theme
        this.themeSelected$.next(this.themeSelected);
      }
    });
  }

  addTheme(theme: Theme): void {
    this.http.post(this.lien,theme).subscribe()
    this.setThemesFromUrl()
  }

  getThemes(id: string) {
    this.http.get<Theme[]>(this.lien+ id +"/themes").subscribe((themess) => {
      this.themes = themess;
      this.themes$.next(this.themes);
    });
  }
}
