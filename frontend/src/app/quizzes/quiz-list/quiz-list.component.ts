import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ThemeService } from '../../../services/theme.service';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public curTheme: Theme;
  private id: string='';
  private curStatus: string;

  constructor(private router: Router, private route: ActivatedRoute , private quizService: QuizService, private themeService: ThemeService) {
    // faut laisser le temps a quiService 2000-3000
    this.curStatus = sessionStorage.getItem("status");
    this.id = this.route.snapshot.paramMap.get('themeid');
    console.log(this.id)
    this.themeService.themeSelected$.subscribe((theme)=>{
      console.log(theme)
      this.curTheme = theme;
      console.log("OUI theme"+this.curTheme)
      this.quizService.setQuizzesFromUrl();
      this.quizService.quizzes$.subscribe((quizzes) =>{
        this.quizList = quizzes
        console.log(this.quizList);
      });
    })
  }

  ngOnInit() {


  }

  quizEdited(selected: Quiz) {
    this.quizService.setSelectedQuiz(selected.id.toString());
    this.router.navigate(["/edit-quiz/",selected.id.toString()])
  }

  quizSelected(selected: Quiz) {
    console.log(selected);
    this.quizService.setSelectedQuiz(selected.id.toString());
    this.router.navigate(['play-quiz', selected.id.toString()]);
  }

  quizDeleted(selected: Quiz) {
    this.quizService.deleteQuiz( selected ).subscribe(() => {
      this.quizList.splice(this.quizList.indexOf(selected), 1);
    });
  }
}
