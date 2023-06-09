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
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit{
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
  ) {
    
    
  }

  createForm = new FormGroup({
    txttitle: new FormControl ('', [Validators.required,
       Validators.minLength(2)]),
    credate: new FormControl ('', [Validators.required]),
    duedate: new FormControl ('', [Validators.required]),
    txtstatus: new FormControl ('', [Validators.required]),
    txtpriority: new FormControl ('', [Validators.required]),
    txtdescrip: new FormControl ('', [Validators.required])

  });
ngOnInit() {

  // this.createForm = this.fb.group({
  //   txttitle: ['My Task', Validators.required,
  //          Validators.minLength(2)],
  //   credate: ['',Validators.required],
  //   duedate: ['',Validators.required],
  //   txtstatus: ['Pending',Validators.required],
  //   txtpriority: ['',Validators.required],
  //   txtdescrip: ['no',Validators.required]
  // });
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
createsubmit(){
  console.log(this.createForm.get("txttitle"));
}

get Title(): FormControl {
   return this.createForm.get("txttitle") as FormControl;
}

get CreateDate(): FormControl {
  return this.createForm.get("credate") as FormControl;
}

get Duedate(): FormControl {
  return this.createForm.get("duedate") as FormControl;
}
get Status(): FormControl {
  return this.createForm.get("txtstatus") as FormControl;
}
get Priority(): FormControl {
  return this.createForm.get("txtpriority") as FormControl;
}
get Description(): FormControl {
  return this.createForm.get("txtdescrip") as FormControl;
}



logout(){
  this.auth.signOut();
}

/*onInsert(){
 if(this.createForm.valid){
   // alert(this.createForm.value+"om")
    console.log(this.createForm.value);
    //send object to the database
    this.authinsert.insertdata(this.createForm.value)
    .subscribe({
      next:(res)=>{

        //console.log(res.message);
        //alert(res.message);
        //this.createForm.reset();
        //alert("Om");
    //For Toasting Message
    this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
    this.createForm.reset();
    this.router.navigate(['view-task'])
      },
      error:(err)=>{
        //alert(err?.error.message);
        //alert("om");
        this.toast.error({detail:"ERROR", summary:"Something went Wrong!.", duration: 5000});
      }
    })
 }
}*/

onInsert(){
  //code part is running is imp while opening these application.
  if(this.createForm.valid){    
    alert(this.createForm.value); 
    console.log(this.createForm.value);
     //send the obj to Database
     this.authinsert.insertdata(this.createForm.value)
     .subscribe({
      next:(res)=>{
        //cemicolon is important 
        //these message is coming from .net login successful
        console.log(res.message);
        //alert(res.message);
        this.createForm.reset();
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
    ValidiateForm.validiateAllFormFields(this.createForm);
    alert("Your Form is invalid");
  }
} 

}
// hideShowPass(){
//   this.inText = !this.inText;
//   this.inText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
//   this.inText ? this.type = "text" : this.type = "password";
// }