import { Component, OnInit} from '@angular/core';
import { UserService} from '../../../services/user.service'
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
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
    public resSelected: Result;
    public quizSelected: Quiz;
    public quizList: Quiz[] = [];

  constructor(private route: ActivatedRoute,private statService: StatService) {
    const id = this.route.snapshot.paramMap.get("userid");
    this.statService.setSelectedUser(id)
    this.statService.userSelected$.subscribe((user)=>{
      this.user = user;
      this.statService.setSelectedResult(id)
      this.statService.resultsSelected$.subscribe(res => {
          this.result = res
          console.log(res)
          statService.getAllQuizzes();
          statService.quizzes$.subscribe((quiz)=> {
  
              for(var i = 0; i< this.result.length; i++){
                  for(var j =0; j < quiz.length; j++){
                      if(this.result[i].quizId == quiz[j].id){
                          this.quizList.push(quiz[j])
                      }
                  }
              }
  
          })
      })
    })

  }

  ngOnInit() {  
  }

  SelectedQuiz(quiz: Quiz){
    this.statService.setSelectedQuiz(quiz.id, quiz.themeId)
    this.statService.quizSelected$.subscribe((quiz)=> this.quizSelected = quiz)
    for(var i in this.result){
        if(this.result[i].quizId == quiz.id)
            this.resSelected = this.result[i];
    }
  }

}
