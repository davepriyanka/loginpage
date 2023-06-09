import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.scss']
})
export class FilterTaskComponent implements OnInit {
  [x: string]: any;

  public users:any = [];
  public role:string = "";

  public fullName : string = ""

  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService){ }

  ngOnInit(){
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
  }
  logout(){
    this.auth.signOut();
  }
}
