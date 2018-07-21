import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';

import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import * as moment from 'moment';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
    selector : 'reseller',
    templateUrl: 'resellerHome.component.html'
})

export class ResellerComponent implements OnInit {
    loading = false;
    returnUrl: string;
    submitted: boolean;
    account: string;
    isClick=false;
    passwordRegex: any = '/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{4,20}/' ;

    year:any
    referalStatus:boolean;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public user:any;
    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,  
        private activatedRoute: ActivatedRoute,
        private global_service : GlobalService,
         private element: ElementRef,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService

        ) 
    { 
       this.year=moment(new Date()).format('YYYY');    
        this.http = http                   

    }

    ngOnInit() {
        
         this.activatedRoute.params.subscribe(params => {
            this.account = params["paramKey"]; 
            if(this.account == "Investor") {
               this.referalStatus=false;
            }else{
               this.referalStatus=true;
            }
        })
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 400);
    }

    
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

   

     
     

      home(){
            window.location.href='https://www.kryptual.com/';
       }

 ngAfterViewInit() {
       window.scrollTo(0, 0);
   }
     
}