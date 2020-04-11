import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

import { QuizService } from '../../../services/quiz.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent implements OnInit {
  
  private themes: Theme[] = [];
  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public ThemeForm: FormGroup;

  constructor(private route: ActivatedRoute,private themeService: ThemeService,public formBuilder: FormBuilder, public quizService: QuizService) {
    // Form creation
    this.ThemeForm = this.formBuilder.group({
      name: [''],
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }



  addTheme() {
    // const id = +this.route.snapshot.paramMap.get('themeid');
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const themeToCreate: Theme = this.ThemeForm.getRawValue() as Theme;

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add theme: ', themeToCreate);

    // Now, add your quiz in the list!
    this.themeService.addTheme(themeToCreate);

    //confirmation création de thème
    let divVerif = document.getElementById('verification');
    let textElement = document.createElement("p");
    var text = document.createTextNode("Le thème a bien été crée !");

    textElement.appendChild(text);
    divVerif.appendChild(textElement);

    //application de style css
    divVerif.className = "verif";
  }

}
