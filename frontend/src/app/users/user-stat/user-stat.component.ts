import { Component, OnInit} from '@angular/core';
import { UserService} from '../../../services/user.service'
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/models/result.model';
import { StatService } from 'src/services/stat.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.scss']
})
export class UserStatComponent implements OnInit {
  public user: User;
    public result: Result[] = [];
    public resSelected: Result = null;
    public quizSelected: Quiz;
    public quizzes: Quiz[] = [];
    public quizList: Quiz[] = [];

  constructor(private route: ActivatedRoute,private router: Router,private statService: StatService) {
    const id = this.route.snapshot.paramMap.get("userid");
    this.statService.setSelectedUser(id)
    this.statService.userSelected$.subscribe((user)=>{
      this.user = user;
      console.log(this.user)
      this.statService.setSelectedResultByUserId(id)
      this.statService.resultsSelected$.subscribe(res => {
        this.result = res
        console.log(res)
        statService.getAllQuizzes();
        statService.quizzes$.subscribe((quiz)=> {
          this.quizzes = quiz;
          console.log(this.quizzes)

          for(var i = 0; i < this.result.length; i++){
            for(var j =0; j < this.quizzes.length; j++){
              if(this.result[i].quiz.id.toString() === this.quizzes[j].id.toString()){
                this.quizList.push(this.quizzes[j])
                this.quizzes.splice(this.quizzes.indexOf(this.quizzes[j]),1);
              }
            }
          }

          console.log(this.quizList)
        })
      })
    })
  }

  ngOnInit() {  
  }

  SelectedQuiz(quiz: Result,i:number){
    this.resSelected = this.result[i];
  }

  showDetails(){
    this.router.navigate(["user-stat",this.user.id,"details", this.resSelected.id])
  }

}
