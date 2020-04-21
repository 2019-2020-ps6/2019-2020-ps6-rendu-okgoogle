import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import {Theme} from '../../../models/theme.model';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})

export class ThemeListComponent implements OnInit {

  public themesList: Theme[] = [];
  public searchTheme: string;

  constructor(private route: ActivatedRoute,private router:Router, public themeService: ThemeService) {  
    this.themeService.setThemesFromUrl()
    this.themeService.themes$.subscribe((theme) => this.themesList = theme);
  }

  ngOnInit() {
    
  }

  themeSelected(selected: Theme) {
    console.log("Le selected"+selected.name)
    this.themeService.themeSelected = selected;
    this.router.navigate(['quiz-list', selected.id.toString()]);
  }
  
  themeDeleted(selected: Theme) {
    this.themeService.deleteTheme(selected.id.toString());
  }
}
