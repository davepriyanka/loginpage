import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-sort-task',
  templateUrl: './sort-task.component.html',
  styleUrls: ['./sort-task.component.scss']
})
export class SortTaskComponent implements OnInit{
  [x: string]: any;

  public users: any = [];
  public role:string = "";

  public fullName : string = ""
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService){ }

  ngOnInit(): void {
      this.api.getUsers()
      .subscribe(res=>{
        this.users = res;
      });

      this.userStore.getFullNameFromStore()
      .subscribe((val) => {
        let fullNameFromToken = this.auth.getRoleFromToken();
        this.fullName = val || fullNameFromToken
      });

      this.userStore.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken
      });
  }
  logout(){
    this.auth.signOut();
  }

}
