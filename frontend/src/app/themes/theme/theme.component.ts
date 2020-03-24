import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  themeDeleted: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() {

  }

  ngOnInit() {  
  }

  selectTheme() {
    this.themeSelected.emit(this.theme);
  }

  deleteTheme(theme: Theme) {
    this.themeDeleted.emit(theme);
  }
}
