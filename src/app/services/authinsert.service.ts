import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthinsertService {

  private baseUrl:string = "https://localhost:7223/api/Insert/";

  constructor(private http : HttpClient, private router: Router) { }

  insertdata(taskObj:any){
    return this.http.post<any>(`${this.baseUrl}insertData`, taskObj)    
   // return this.http.post<any>(`${this.baseUrl}authenticate` ,loginObj)
  }

  
  signOut(){
    localStorage.clear();
    //both are same
    //localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
}
