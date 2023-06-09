import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  [x: string]: any;

  constructor(private auth: AuthService, 
    private router: Router,
    private toast: NgToastService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //inside these line we will get our token
    const myToken = this.auth.getToken(); //using these token we want to append our token with header

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`} // Same as ng serve -o "Bearer"+myToken
      })
    }

    return next.handle(request).pipe(
      catchError((err : any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            
            this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"})           
            this.router.navigate(['login'])
          }
        }
        return throwError(()=> new Error("Some other error occured") )
      })
    ) //request will get handle using these
  }
}
