  import { Component, OnInit,NgModule ,Input,Output, EventEmitter} from '@angular/core';
  import { GlobalService } from './../../../GlobalService';
  import * as moment from 'moment';  import { Router, ActivatedRoute } from '@angular/router';

  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
 import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { MessageService } from './../../../message.service';

  @Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
  })

  export class MyProfileComponent implements OnInit {
  private subject = new Subject<any>();
  public user:any;
  firstName:any;
  public profileDetail:any;
  updateDetails: SignupDetail;
  updateForm: FormGroup;
  constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,            
                private global_service:GlobalService,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
                private messgage : MessageService
      ) {     
    var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }
          this.user=JSON.parse(localStorage.getItem('currentUser')); 
          if(this.user!=null||this.user!=undefined){
            this.userInfo();
          }         

          this.updateDetails = { 
            firstName: '',
            lastName: '' ,
            email:''         
           }

        }

   userInfo(){
       let postData ={
          userId : this.user._id,  
       };
          const url = this.global_service.basePath + 'api/GetProfileByUserId/';
            this.global_service.PostRequest(url,postData).subscribe(response=>{  
            if(response[0].json.status==200){
              if(response[0].json.json().data){
                 this.updateDetails=response[0].json.json().data; 
              }          
            }
          })
    }
   
    updateUserInfo(){
      this.ng4LoadingSpinnerService.show();
      let postData ={
          userId : this.user._id,
          firstName:this.updateDetails.firstName,
          lastName: this.updateDetails.lastName,
          email:this.updateDetails.email
       };
       const url = this.global_service.basePath + 'api/UpdateUserProfileById/';
       this.global_service.PostRequest(url,postData).subscribe(response=>{ 
            if(response[0].json.status==200){
              this.messgage.sendMessage(this.updateDetails.firstName);

              this.user.firstName=this.updateDetails.firstName;
             localStorage.setItem('currentUser', JSON.stringify(this.user));

              this.ng4LoadingSpinnerService.hide();
             this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                          
            }else{
              this.ng4LoadingSpinnerService.hide();
              this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');              
             }
          })
    }

   ngOnInit() {  
        this.myprofileFormInit();
    }

    myprofileFormInit(){
      this.updateForm = this.fb.group({
            'firstName': new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][a-zA-Z\\s]+$/)])),
            'lastName': new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][a-zA-Z\\s]+$/)])),
            'email': new FormControl('', Validators.required)
        });
    }
   
  }
