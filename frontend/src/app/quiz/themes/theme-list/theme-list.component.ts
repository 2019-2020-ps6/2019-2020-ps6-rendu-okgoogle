import { Component, OnInit, ElementRef } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import {Theme} from '../../../../models/theme.model';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})

export class ThemeListComponent implements OnInit {

  public themesList: Theme[] = [];
  public searchTheme: string;
  public curStatus: string
  public page : string;
  public hasThemeWithQuiz: boolean = false;

  constructor(private elementRef: ElementRef,private route: ActivatedRoute,private router:Router, public themeService: ThemeService) {  
    this.themeService.setThemesFromUrl()
    this.themeService.themes$.subscribe((theme) =>{
      this.themesList = theme
      this.checkQuiz()
    });
    this.page = this.router.url.split('/')[1]
    this.curStatus = sessionStorage.getItem("status")
  }
  
  ngOnInit() {
    this.checkQuiz()
  }

  themeSelected(selected: Theme) {
    this.themeService.setSelectedTheme(selected.id.toString())
    if(sessionStorage.getItem("status") == "admin"){
      this.router.navigate(['theme-edit', selected.id.toString()]);
    }else{
      this.router.navigate(['quiz-list', selected.id.toString()]);
    }
  }
  
  themeDeleted(selected: Theme) {
    this.themeService.deleteTheme(selected.id.toString());
  }

  goToCreateTheme(){
    this.router.navigate(['create-theme']);
  }
  clickSearch(){
    var _searchContainers = this.elementRef.nativeElement.querySelector('.expandSearch');
    if(_searchContainers.className === "expandSearch"){
        _searchContainers.classList.add("expandSearch");
        _searchContainers.classList.add("showSearch")
    }else{
        _searchContainers.classList.remove("showSearch")
    }
  }

  checkQuiz(){
    for(var i in this.themesList){
      if(this.themesList[i].quiz.length != 0){
        this.hasThemeWithQuiz = true;
      }
    }
  }

}
