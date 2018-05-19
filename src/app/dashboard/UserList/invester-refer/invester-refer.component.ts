import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import * as moment from 'moment';
import { GlobalService } from './../../../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { AuthService } from "angular2-social-login";
import { FacebookParams} from './FacebookParams';
import { GooglePlusParams} from './GooglePlusParams';
import { LinkedinParams} from './LinkedinParams';
import { PinterestParams} from './PinterestParams';
import { TwitterParams} from './TwitterParams';



@Component({
  selector: 'app-refer',
  templateUrl: './invester-refer.component.html',
  styleUrls: ['./invester-refer.component.scss']  
})

export class InvesterReferComponent implements OnInit {
user:any;
referData:any;
accountType:boolean;
couponCode : string;
sub : any;
coupenStatus:boolean=true;
linkStatus:boolean=false;
kryptualPoints:any;

    constructor(
        private router: Router,
        private global_service : GlobalService,
        public _auth: AuthService,        
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
        ) {

          var status = this.global_service.isLogedIn();
          if(status==false){
           this.router.navigateByUrl('/login');
          }
      this.user=JSON.parse(localStorage.getItem('currentUser'));
       this.getPoints();
                if(this.user!=null||this.user!=undefined)
                   {
                      if(this.user.accountType == "Investor")
                      {
                        this.accountType=false;
                      }else
                      {
                        this.accountType=true;
                      }
                   this.refferalCall();
                  
                  }

    }

  ngOnInit() {}


     refferalCall(){
          let postData ={
                        userId:this.user._id
                   };
         const url = this.global_service.basePath + 'api/getInvestorCode';
          this.user=localStorage.getItem('currentUser');
          this.global_service.PostRequestUnautorized(url , postData)
        .subscribe((response) => {
          if(response[0].json.status==200){
            this.coupenStatus=false;
            this.linkStatus=true;
          this.referData=response[0].json.data;
          }else{

           this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');
          }

        })
     }

//get KP points
getPoints(){
               let postData ={
                 userId : this.user._id
               };
            const url = this.global_service.basePath + 'api/getKryptualPoints';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
            this.kryptualPoints=response[0].json.json().data;
            }else{
             this.kryptualPoints="0";
            }
          })
    }

//on click button Generate Code
  generatecode(){
     this.ng4LoadingSpinnerService.show();
          let userId = JSON.parse(this.user)._id;
          let postData ={
                        userId : userId
                        //code : this.couponCode
                   };
         const url = this.global_service.basePath + 'api/generateInvestorCode';
          this.global_service.PostRequestUnautorized(url , postData)
        .subscribe((response) => {
           let res = response[0].json;
          if(res.status){
             this.ng4LoadingSpinnerService.hide();
             if(res.data){
               this.coupenStatus=false;
               this.linkStatus=true;
              this.referData=res.data;
              this.couponCode = '';
              this.global_service.showNotification('top','right',res.message,2,'ti-cross');
             }else{
               this.global_service.showNotification('top','right',res.message,4,'ti-cross');
               this.couponCode ='';
             }

          }
          else{
             this.ng4LoadingSpinnerService.hide();
             this.global_service.showNotification('top','right',res.message,4,'ti-cross');
          }

        })
  }

}
