import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/models/result.model';
import { StatService } from 'src/services/stat.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-user-stat-detail',
  templateUrl: './user-stat-detail.component.html',
  styleUrls: ['./user-stat-detail.component.scss']
})
export class UserStatDetailComponent implements OnInit {
    public user: User;
    public resSelected: Result;

    constructor(private route: ActivatedRoute,private statService: StatService) {

    }

    ngOnInit(): void{
        const userid = this.route.snapshot.paramMap.get("userid");
        const resultid = this.route.snapshot.paramMap.get("resultid");
        this.statService.setSelectedUser(userid)
        this.statService.userSelected$.subscribe((user)=>{
            this.user = user;
            this.statService.setSelectedResultById(userid,resultid)
            this.statService.resSelected$.subscribe(res => {
                this.resSelected = res
            })
        })
    }

}
