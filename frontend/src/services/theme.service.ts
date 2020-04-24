import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private themes: Theme[] = [];
  public themeSelected: Theme;

  private lien = "http://localhost:9428/api/themes/";

  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();

  constructor(private http: HttpClient) {
    
  }

  getThemeById(themeid: string){
    const urlWithId = this.lien + themeid;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected = theme;
      this.themeSelected$.next(this.themeSelected);
    })
  }

  setSelectedTheme(theme: string) {
    const urlWithId = this.lien + theme.toString();
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected = theme[0];
      this.themeSelected$.next(this.themeSelected);
    });
  }
  
  deleteTheme(selected: string) {
    const url = this.lien+selected.toString();
    const header = this.prepareHeader();
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
      this.themes.reverse()
      this.themes$.next(this.themes);
    });
  }


  addTheme(theme: Theme): void {
    this.http.post(this.lien,theme).subscribe(()=>{
      this.setThemesFromUrl()
    })
  }

  editTheme(themeid:string, theme: Theme){
    const url = this.lien + themeid; 
    this.themes$.next(this.themes);
    this.http.put<Theme>(url, theme).subscribe((theme)=>{
      this.setSelectedTheme(themeid)
    })
  }
}
