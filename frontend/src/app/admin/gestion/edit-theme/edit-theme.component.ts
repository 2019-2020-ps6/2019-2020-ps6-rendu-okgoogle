import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})

export class editThemeComponent implements OnInit {

  public curTheme: Theme
  public themesForm: FormGroup
  public themeEdit: boolean;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private themeService: ThemeService) {
  }

  ngOnInit() {
    const themeid = this.route.snapshot.paramMap.get('themeid');
    this.themeService.setSelectedTheme(themeid)
    this.themeService.themeSelected$.subscribe((theme) => {
      console.log(theme)
      this.curTheme = theme
      this.initializeThemeForm()
    })
  }

  private initializeThemeForm() {
    this.themesForm = this.formBuilder.group({
      name: this.curTheme.name,
      imageUrl: this.curTheme.imageUrl
    });
  }

  editTheme() {
    this.themeEdit = true;
  }

  validateTheme() {
    const themeid = this.route.snapshot.paramMap.get('themeid');
    const theme = this.themesForm.getRawValue() as Theme;
    this.themeService.editTheme(themeid, theme)
    this.themeEdit = false;
  }

  cancelTheme() {
    this.themeEdit = false;
  }
}