import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import {Theme} from '../../../models/theme.model';
import { ActivatedRoute, Router } from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})

export class ThemeListComponent implements OnInit {

  public themesList: Theme[] = [];

  constructor(private _location: Location,private route: ActivatedRoute, public themeService: ThemeService) {  
    this.themeService.themes$.subscribe((theme) => this.themesList = theme);
  }

  ngOnInit() {
    
  }

  back_click(){
    this._location.back();
  }


  themeSelected(selected: Theme) {
    this.themeService.getTheme(selected.id.toString());
  }
}
