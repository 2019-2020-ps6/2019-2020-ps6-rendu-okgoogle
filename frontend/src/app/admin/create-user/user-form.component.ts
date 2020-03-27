import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  user:User;
  
  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public userForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder, public userService: UserService) {

    
    // // Form creation

    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
    if(this.user != null){
      this.userForm = this.formBuilder.group({
        name: this.user.name,
        surname: new FormControl(this.user.name, [
          Validators.required,
          Validators.minLength(4)
        ]),
        age:this.user.age,
        sexe: this.user.sexe,
        description: this.user.description
      });
    }else{
    this.userForm = this.formBuilder.group({
      name: [''],
      surname: new FormControl([''], [
        Validators.required,
        Validators.minLength(4),
      ]),
      age:0,
      sexe: [''],
      description: ['']
    });
    }


  }

  addUser() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const userToCreate: User = this.userForm.getRawValue() as User;

    if(userToCreate.sexe == "F"){
      userToCreate.img = "https://www.w3schools.com/howto/img_avatar2.png";
    }else{
      userToCreate.img = "https://www.w3schools.com/howto/img_avatar.png";
    }

    for(var i in userToCreate){
      if(userToCreate[i] === ""){
        userToCreate[i] = "Non renseigné"
      }
    }

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add user: ', userToCreate);
    this.router.navigate(['/user-list']);

    // Now, add your quiz in the list!
    this.userService.addUser(userToCreate);
  }

}
