import { Component,  OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidiateForm from 'src/app/helpers/validiateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  type: string = "password";
  inText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  //to group the form we required form group
  signUpForm!: FormGroup;
  //private auth : AuthService :- for Database Authentication
  //private router: Router :- for Routing Singup to login page
  constructor(private fb: FormBuilder, 
    private auth : AuthService, 
    private router: Router,
    private toast: NgToastService
    ){}

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
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

  onSignUp(){
   
    if(this.signUpForm.valid){
    
      // console.log(this.signUpForm.value);
       //send the obj to 
       this.auth.signup(this.signUpForm.value)
       .subscribe({
        next:(res=>{
          //cemocolon is important
          //alert(res.message);
            //For Toasting Message
            this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
            
          this.signUpForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          //alert(err?.error.message);
          this.toast.error({detail:"ERROR", summary:"Something went Wrong", duration: 5000});
        })
       })

       console.log(this.signUpForm.value);
    }else{
      //throw the error using toaster and required fields
      console.log("Form is not valid");
      ValidiateForm.validiateAllFormFields(this.signUpForm);
      alert("Your Form is invalid");
    }
  }
  
    //create a method validiateallforms
    

  }

