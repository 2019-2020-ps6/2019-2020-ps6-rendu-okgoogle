import {Component, OnInit} from '@angular/core'
import {UserService} from '../../../services/user.service'
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Recupere un quiz avec plusieurs questions
 */

@Component({
    selector:'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']  
})

export class editUserComponent implements OnInit{
    public user : User;

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.users$.subscribe((user) => {
            for(var i in user){
                if(user[i].toString() === id.toString()){
                    this.user = user[i]
                    this.userService.users$.subscribe(data => { // subscribe once to the data stream
                        //this.user = data;
                    })
                }
            }
        })
    }

    constructor(private router: Router,private route: ActivatedRoute, private userService: UserService){


    }


}