import { Injectable } from '@angular/core'; import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //for Url We have Create these Property
  private baseUrl:string = "https://localhost:7223/api/User/";
  private userPayload:any;
//for API HTTP Call we need to inject HTTP Clients
//private  router: Router these line is imp in constructor when we want to perform routing.
  constructor(private http : HttpClient, private  router: Router) { 
    this.userPayload = this.decodeToken();
  }

  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register` ,userObj)
  }

  signin(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate` ,loginObj)

  }

  signOut(){
    localStorage.clear();
    //both are same
    //localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
//fpr storing or Setting the Token
  storeToken(tokenValue: string)
  {
      localStorage.setItem('token', tokenValue)
  }
// for Getting The Token
  getToken(){
    return localStorage.getItem('token')
  }
// !! sign help convert string to the boolean.
//if there is a Token It will return True else it return false.
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
//decode the token '@auth0/angular-jwt'
// decodeToken send the paylosd data

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  //To Get the Username For Payload
  getfullNameFromToken(){
      if(this.userPayload){
      //console.log(this.userPayload.unique_name);
        return this.userPayload.unique_name;        
      }
  }
  //To Get the Role For Payload
  getRoleFromToken(){
    if(this.userPayload){
      //alert(this.userPayload.role);
      return this.userPayload.role;
    }
  }

  //sign-in with google.
//sign in with google
// googleSignIn() {
//   return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

//     this.router.navigate(['/dashboard']);
//     localStorage.setItem('token',JSON.stringify(res.user?.uid));

//   }, err => {
//     alert(err.message);
//   })
// }
}
