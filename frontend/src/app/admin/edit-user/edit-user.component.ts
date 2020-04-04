import {Component, OnInit, Input} from '@angular/core'
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

    public user:User;

    ngOnInit(): void {
        
    }

    constructor(private router: Router,private route: ActivatedRoute, private userService: UserService){
        const id = this.route.snapshot.paramMap.get('userid');
        this.userService.setSelectedUser(id.toString());
        this.userService.userSelected$.subscribe((user) => this.user = user);
    }

    editUser(user: User){
        this.userService.editUser(this.user.id.toString(),user);
        this.router.navigate(['user-list'])
    }


}