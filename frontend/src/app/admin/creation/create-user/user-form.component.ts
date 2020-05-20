import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public goal: string;

  @Input()
  user:User;

  @Output()
  userEdited: EventEmitter<User> = new EventEmitter<User>();

  public userForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder, public userService: UserService) {

  }

  ngOnInit() {
    if(this.user != null){
      this.goal = 'edit';
      this.userForm = this.formBuilder.group({
        name: this.user.name,
        surname: this.user.surname,
        age:this.user.age,
        sexe: this.user.sexe,
        description: this.user.description
      });
    }else{
      this.goal = 'create';
      this.userForm = this.formBuilder.group({
        name: [''],
        surname: ['',Validators.required],
        age:['', Validators.required],
        sexe: ['',Validators.required],
        description: ['']
      });
    }
  }


  addUser() {
    if(this.userForm.valid){
      const userToCreate: User = this.userForm.getRawValue() as User;

      if(userToCreate.sexe == "F"){
        userToCreate.img = "https://www.w3schools.com/howto/img_avatar2.png";
      }else{
        userToCreate.img = "https://www.w3schools.com/howto/img_avatar.png";
      }
  

      if(userToCreate.description === "")
        userToCreate.description = "Non renseigné"

      

      this.router.navigate(['user-list']);
  
      this.userService.addUser(userToCreate);
    }
  }

  editUser(){
    const userToCreate: User = this.userForm.getRawValue() as User;
    
    if(userToCreate.sexe == "F"){
      userToCreate.img = "https://www.w3schools.com/howto/img_avatar2.png";
    }else{
      userToCreate.img = "https://www.w3schools.com/howto/img_avatar.png";
    }


    if(userToCreate.description === "")
      userToCreate.description = "Non renseigné"

    
    this.userEdited.emit(userToCreate);
  }

}
