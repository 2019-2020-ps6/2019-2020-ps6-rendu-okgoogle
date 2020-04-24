import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})

export class editThemeComponent implements OnInit {

  public curTheme: Theme

  constructor(private route: ActivatedRoute, private themeService: ThemeService) { 
  }
  
  ngOnInit() {
    const themeid = this.route.snapshot.paramMap.get('themeid');
    this.themeService.setSelectedTheme(themeid.toString())
    this.themeService.themeSelected$.subscribe((theme)=> {
      this.curTheme = theme
    })
  }

}