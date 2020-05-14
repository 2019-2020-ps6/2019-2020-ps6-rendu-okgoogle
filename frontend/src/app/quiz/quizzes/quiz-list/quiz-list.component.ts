import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../../services/quiz.service';
import { ThemeService } from '../../../../services/theme.service';
import { Quiz } from '../../../../models/quiz.model';
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
  public id;
  public searchQuiz: string;
  public quizNb : number = -1;
  private curStatus: string;
  reversed: boolean;

  constructor(private router: Router, private route: ActivatedRoute , private resService: QuizService, private quizService: QuizService, private themeService: ThemeService) {
    this.id = this.route.snapshot.paramMap.get('themeid');
    this.themeService.setSelectedTheme(this.id.toString());
    this.themeService.themeSelected$.subscribe((theme)=>this.curTheme = theme)
    this.quizService.getQuizzesByThemeId(this.id.toString());
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quizList = quizzes
    });
    
  }

  ngOnInit() {
    this.curStatus = sessionStorage.getItem("status");   
  }

  quizEdited(selected: Quiz) {
    this.id = +this.route.snapshot.paramMap.get('themeid');
    this.router.navigate(["theme-edit",selected.themeId.toString(),"edit-quiz",selected.id.toString()])
  }

  quizSelected(selected: Quiz) {
    this.id = +this.route.snapshot.paramMap.get('themeid');
    this.router.navigate(['play-quiz', selected.themeId.toString(),'quiz',selected.id.toString()]);
  }

  quizDeleted(selected: Quiz) {
    this.id = +this.route.snapshot.paramMap.get('themeid');
    this.quizService.deleteQuiz(this.id.toString(), selected )
  }

  clickSearch(){
    var searchbox = document.querySelector(".searchbox");
    searchbox.setAttribute("placeholder", "Search...");
  }
  
  noSearch(){
    var searchbox = document.querySelector(".searchbox");
    searchbox.nodeValue = null;
    searchbox.removeAttribute("placeholder");
  }
  
}
