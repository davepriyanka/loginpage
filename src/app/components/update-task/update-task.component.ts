import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import  ValidiateForm from 'src/app/helpers/validiateform';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthinsertService } from 'src/app/services/authinsert.service';
import { InsertApiService } from 'src/app/services/insertapi.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  [x: string]: any;

  public users:any = [];
  public role:string = "";

  public fullName : string = ""
   //createForm!: FormGroup;
 
 constructor(
  private fb: FormBuilder, 
  private auth: AuthService, 
  private api : ApiService,
  private insertapi : InsertApiService,
  private router: Router,
  private toast: NgToastService,
  private userStore: UserStoreService,
  private authinsert: AuthinsertService
 ){ 
 }

 updateForm = new FormGroup({
  txttitle: new FormControl ('My Task', [Validators.required,
     Validators.minLength(2)]),
  credate: new FormControl ('03/02/2001', [Validators.required]),
  duedate: new FormControl ('03/02/2010', [Validators.required]),
  txtstatus: new FormControl ('Pending', [Validators.required]),
  txtpriority: new FormControl ('Medium', [Validators.required]),
  txtdescrip: new FormControl ('no', [Validators.required])

});
ngOnInit(){
  this.api.getUsers()
  .subscribe(res=>{
    this.users = res;
    
  });

  this.userStore.getFullNameFromStore()
  .subscribe((val) =>{
    let fullNameFromToken = this.auth.getfullNameFromToken();
    this.fullName = val || fullNameFromToken
  });
}
 updatesubmit(){
  console.log(this.updateForm.get("txttile"));
 }
 
get Title(): FormControl {
      return this.updateForm.get("txttitle") as FormControl;
}

get CreateDate(): FormControl {
  return this.updateForm.get("credate") as FormControl;
}
get Duedate(): FormControl {
  return this.updateForm.get("duedate") as FormControl;
}
get Status(): FormControl {
  return this.updateForm.get("txtstatus") as FormControl;
}
get Priority(): FormControl {
  return this.updateForm.get("txtpriority") as FormControl;
}
get Description(): FormControl {
  return this.updateForm.get("txtdescrip") as FormControl;
}

logout(){
  this.auth.signOut();
}

onUpdate(){
  //code part is running is imp while opening these application.
  if(this.updateForm.valid){    
    alert(this.updateForm.value); 
    console.log(this.updateForm.value);
     //send the obj to Database
     this.authinsert.insertdata(this.updateForm.value)
     .subscribe({
      next:(res)=>{
        //cemicolon is important 
        //these message is coming from .net login successful
        console.log(res.message);
        //alert(res.message);
        this.updateForm.reset();
        //this.auth.storeToken(res.token)

        //use set method which created in auth.service.ts
        // const tokenPayload = this.auth.decodeToken();
        // this.userStore.setFullNameForStore(tokenPayload.unique_name);
        // this.userStore.setRoleForStore(tokenPayload.role)

        //For Toasting Message
        this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
        //this.loginForm.reset();
        this.router.navigate(['view-task'])
      },
      
      error:(err)=>{
        //alert("Something went Wrong!.")
        //For Toasting Message
        this.toast.error({detail:"ERROR", summary:err?.error.message , duration: 5000});
       // alert(err?.error.message);
        console.log(err);         
      }
     })
  }else{
    //throw the error using toaster and required fields
    console.log("Form is not valid");
    ValidiateForm.validiateAllFormFields(this.updateForm);
    alert("Your Form is invalid");
  }
} 

}

