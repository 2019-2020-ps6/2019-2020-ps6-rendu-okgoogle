import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public curStatus:string;
  private confirmationDelete: boolean = false;

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
    this.themeSelected.emit(this.theme);
  }

  deleteTheme(theme: Theme, confirmation: boolean) {
    if(confirmation){
      this.themeDeleted.emit(theme);
      this.confirmationDelete = false;
    }else{
      this.confirmationDelete = false;
    }
  }
  deleteConfirmation(){
      this.confirmationDelete = true;
  }
}
