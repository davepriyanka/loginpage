import { Component, OnInit } from '@angular/core';
import {ApiService} from './../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;

  public users:any = [];
  public role:string = "";

  public fullName : string = ""
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getUsers()
      .subscribe(res=>{
        this.users = res;        
      });
// subscribe gives the error when method does not have return type. 
      this.userStore.getFullNameFromStore()
      .subscribe((val) => {
        let fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken             
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
        let roleFromToken = this.auth.getRoleFromToken();
        //alert(roleFromToken+"om");
        this.role = val || roleFromToken
      });
  }

  logout(){
    this.auth.signOut();
  }
}
