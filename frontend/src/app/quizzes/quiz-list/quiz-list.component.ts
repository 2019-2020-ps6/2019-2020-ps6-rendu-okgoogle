import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ThemeService } from '../../../services/theme.service';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute, Router } from "@angular/router";
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public curTheme: Theme;

  constructor(private router: Router,private route: ActivatedRoute ,public quizService: QuizService,public themeService: ThemeService) {
    const id = +this.route.snapshot.paramMap.get('themeid');
    this.themeService.getTheme(id.toString());
    this.curTheme = this.themeService.themeSelected
    this.quizService.setQuizzesFromUrl(); // pas besoin de retourner un array ou observable
    //grace au concept de l'observable les resultat se met a jour automatiquement avec la func precedente
    this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes)
    console.log(this.quizList)
  }

  ngOnInit() {

  }

  quizSelected(selected: Quiz) {
    console.log(selected)
    this.quizService.setSelectedQuiz(selected.id)
  }

  quizDeleted(selected: Quiz) {
    const id = +this.route.snapshot.paramMap.get('themeid');
    this.quizService.deleteQuiz(id.toString(),selected).subscribe(() =>{
      this.quizList.splice(this.quizList.indexOf(selected), 1);
    })
  }
}
