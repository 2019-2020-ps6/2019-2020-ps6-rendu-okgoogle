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
  private id = 0;

  constructor(private router: Router, private route: ActivatedRoute , private quizService: QuizService, private themeService: ThemeService) {
    // faut laisser le temps a quiService 2000-3000
    setTimeout(() => {
      this.id = +this.route.snapshot.paramMap.get('themeid');
      this.themeService.getTheme(this.id.toString());
      this.curTheme = this.themeService.themeSelected;
      console.log("curtheme: " + this.curTheme);
      this.quizService.setQuizzesFromUrl(); // pas besoin de retourner un array ou observable
      // grace au concept de l'observable les resultat se met a jour automatiquement avec la func precedente
      this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
    }, 100 );
  }

  ngOnInit() {

  }

  quizSelected(selected: Quiz) {
    console.log(selected);
    this.quizService.setSelectedQuiz(selected.id.toString());
  }

  quizDeleted(selected: Quiz) {
    this.quizService.deleteQuiz(this.id.toString(), selected ).subscribe(() => {
      this.quizList.splice(this.quizList.indexOf(selected), 1);
    });
  }
}
