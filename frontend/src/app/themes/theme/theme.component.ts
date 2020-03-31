import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public curStatus:string;

  @Input()
  theme: Theme;

  @Output()
  themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  themeDeleted: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() {
    this.curStatus = sessionStorage.getItem("status")
  }

  ngOnInit() {  
  }

  selectTheme() {
    console.log("Theme selec"+ this.theme)
    this.themeSelected.emit(this.theme);
  }

  deleteTheme() {
    this.themeDeleted.emit(this.theme);
  }
}
