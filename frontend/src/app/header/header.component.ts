import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // nomUser : string = "";
  // prenomUser : string = "";

  constructor( private userService:UserService, private router : ActivatedRoute) {

    // this.userService.userSelected$.subscribe((user)=>{
    //   this.nomUser = user.name;
    //   this.prenomUser = user.surname;
    // })
  }

  ngOnInit() {
    // const userid = this.router.snapshot.paramMap.get('userid');
    // console.log(userid)
    // if(userid != undefined){
    //   this.userService.setSelectedUser(userid)
    //   console.log(this.userService.userSelected.surname)
    // }
  }

}
