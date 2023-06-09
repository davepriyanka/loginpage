//for creating these auth guard ng g g auth then select CanActivate() guard.
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
//import {CanActivate} from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //in angular constructor is used to inject services
   constructor(private auth :AuthService, private router: Router, private toast: NgToastService) {
   
    
  }
  canActivate():boolean{
   if(this.auth.isLoggedIn()){
      return true
   }else{
    this.toast.error({detail:'ERROR', summary:"Please Login First!."});
    this.router.navigate(['/login'])
    return false;

   }
   
  }
  
}
