import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import * as moment from 'moment';
import { GlobalService } from '../GlobalService';
import { AuthService } from "angular2-social-login"
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;
@Component({
  selector: 'app-sharepoints',
  templateUrl: './sharepoints.component.html',
  styleUrls: ['./sharepoints.component.scss']
})
export class SharepointsComponent implements OnInit {
user:any;
referData:any;
userQuery:any;
  constructor(
        private router: Router,
        private global_service : GlobalService,
        public _auth: AuthService,        
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private activatedRoute: ActivatedRoute,

  	) { 
    this.user=localStorage.getItem('currentUser');
    this.activatedRoute.queryParams.subscribe(params => {        
           this.userQuery = params["userId"];
        })

this.refferalCall();

  }

  ngOnInit() {
    

  }

  refferalCall(){
    let postData;
    if(this.userQuery){
                     postData ={
                                   userId:this.userQuery                        
                               };
    }else{        
           this.router.navigateByUrl('/login'); 
           window.location.reload();                        
           return;
        }
         const url = this.global_service.basePath + 'api/getInvestorCode';          
         this.global_service.PostRequestUnautorized(url , postData)
        .subscribe((response) => {
          if(response[0].json.status==200){            
            this.referData=response[0].json.data;     
            this.showRefferalCode();
          }else{
             this.userQuery=false;
             this.showRefferalCode();
          }

        })
     }

     showRefferalCode(){
        $('#noticeModal2').modal('show');
      }


      home(){
       this.router.navigateByUrl('/login');
       window.location.reload(); 
      }


}
