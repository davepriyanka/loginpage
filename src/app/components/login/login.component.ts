import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidiateForm from 'src/app/helpers/validiateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  inText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  //to group the form we required form group
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
    
    ){}

  ngOnInit(): void{
   this.loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
   })
  }
  //Password Hide And Show Fuction On Eye Click.
  hideShowPass(){
    this.inText = !this.inText;
    this.inText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.inText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    //code part is running is imp while opening these application.
    if(this.loginForm.valid){     
      console.log(this.loginForm.value);
       //send the obj to Database
       this.auth.signin(this.loginForm.value)
       .subscribe({
        next:(res)=>{
          //cemicolon is important 
          //these message is coming from .net login successful
          console.log(res.message);
          //alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token)

          //use set method which created in auth.service.ts
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role)

          //For Toasting Message
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          //this.loginForm.reset();
          this.router.navigate(['home-page'])
        },
        
        error:(err)=>{
          //alert("Something went Wrong!.")
          //For Toasting Message
          this.toast.error({detail:"ERROR", summary:"Something went Wrong!.", duration: 5000});
         // alert(err?.error.message);
          console.log(err);         
        }
       })
    }else{
      //throw the error using toaster and required fields
      console.log("Form is not valid");
      ValidiateForm.validiateAllFormFields(this.loginForm);
      //alert("Your Form is invalid");
      this.toast.error({detail:"ERROR", summary:"Form is not valid!.", duration: 5000});
    }
  }
  
  // signInWithGoogle() {
  //   this.auth.googleSignIn();
  // }
}
