import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/models/result.model';
import { StatService } from 'src/services/stat.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.scss']
})
export class UserStatComponent implements OnInit {
  public user: User;
  public result: Result[] = [];
  public themeFavori: Theme;
  public resSelected: Result = null;

  constructor(private route: ActivatedRoute,private router: Router,private statService: StatService,private themeService: ThemeService) {
    const id = this.route.snapshot.paramMap.get("userid");
    this.statService.setSelectedUser(id)
    this.statService.userSelected$.subscribe((user)=>{
      this.user = user;
      this.statService.setSelectedResultByUserId(id)
      this.statService.resultsSelected$.subscribe(res => {
        this.result = res
        this.getThemeFavori()
      })
    })
  }

  ngOnInit() {  
    const id = this.route.snapshot.paramMap.get("userid");
    this.statService.setSelectedUser(id)
    this.statService.userSelected$.subscribe((user)=>{
      this.user = user;
      this.statService.setSelectedResultByUserId(id)
      this.statService.resultsSelected$.subscribe(res => {
        this.result = res
        this.getThemeFavori()
      })
    })
  }

  SelectedQuiz(i:number){
    this.resSelected = this.result[i];
  }

  showDetails(){
    this.router.navigate(["user-stat",this.user.id,"details", this.resSelected.id])
  }

  getThemeFavori(){

    var modeMap = {};
    var maxEl = this.result[0].quiz.themeId, maxCount = 1;

    for(var i = 0; i < this.result.length; i++)
    {
        var el = this.result[i].quiz.themeId;
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    
    this.themeService.getThemeById(maxEl);
    this.themeService.themeSelected$.subscribe((theme)=> this.themeFavori = theme[0]);
    
  }

}
