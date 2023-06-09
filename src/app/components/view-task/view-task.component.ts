import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthinsertService } from 'src/app/services/authinsert.service';
import { InsertApiService } from 'src/app/services/insertapi.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  [x: string]: any;

  public users:any = [];
  public tasks:any = [];
  public role:string="";

  public fullName : string = ""
 
  constructor(
    private api : ApiService, 
    private insertapi: InsertApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService, 
    private authinsert: AuthinsertService
    ) {   
  }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    });
    
    this.insertapi.getTasks()
   .subscribe(res=>{
    this.tasks = res;
   });

  this.userStore.getRoleFromStore()
  .subscribe((val) => {
    let fullNameFromToken = this.auth.getRoleFromToken();
    this.fullName = val || fullNameFromToken
  })

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    })
      
  }
logout(){
  this.auth.signOut();
}
 
}
