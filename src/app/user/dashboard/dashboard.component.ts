import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userList: any = [];
  noData: boolean = false;
  constructor( private userServiceService:UserServiceService,private router:Router) { }

  ngOnInit() {

    if(localStorage.getItem('accessToken') == null){
      this.router.navigateByUrl('/login');
      return;
    }

    this.userServiceService.dashboard().then((res: any) => {
      if (res != null) {
        this.noData = false;
        this.userList = res;
      } else {
        this.noData = true;
        this.userList = [];
      }
    }).catch(err => {
      console.log(err);
    })
  }

  Logout(){
    this.router.navigateByUrl('/login')
    localStorage.clear();
  }

}
