import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import * as moment from 'moment';
declare let ga: Function;
@Component({
  
    selector : 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
   
    loading = false;
    isClick=false;
    returnUrl: string;
    submitted: boolean;
    loginDetail:LoginDetail;
    loginForm: FormGroup;
    tokens:any;
    tokenId : any;
    tokenAddress:any;
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    year:any
    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,       
        private global_service : GlobalService,  
        private element: ElementRef,
        private activatedRoute: ActivatedRoute,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
        )   { 
            this.year=moment(new Date()).format('YYYY');
            this.nativeElement = element.nativeElement;
            this.sidebarVisible = false;
            this.http = http;
            this.loginDetail = {           
                email:'',
                password: '',
           }
             this.router.events.subscribe(event => {
             if (event instanceof NavigationEnd) {
               ga('set', 'page', event.urlAfterRedirects);
               ga('send', 'pageview');
              }
            });
         }

        ngOnInit() {       

        this.loginFormInit();
            
      
         var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 400);
    }

    loginFormInit(){
      this.loginForm = this.fb.group({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
            
        });
    }

      login(){ 
      this.global_service.emitEvent("Signin", "click", this.loginDetail.email, 1); 
       this.ng4LoadingSpinnerService.show(); 
       this.loading=true;
       this.loginDetail.email=this.loginDetail.email.toLowerCase();
      
     const url = this.global_service.basePath + 'api/login';
          this.global_service.PostRequestUnautorized(url , this.loginDetail)
        .subscribe((response) => {     
          if(response[0].json.status==200){
            this.ng4LoadingSpinnerService.hide();
            this.loading=false;
              this.loginForm.reset();                    
              localStorage.setItem('currentUser', JSON.stringify(response[0].json.data));
              localStorage.setItem('token', response[0].json.token);
              var user=JSON.parse(localStorage.getItem('currentUser')); 
              if(user.accountType=="Admin"){
                this.router.navigateByUrl('/dashboard/adminDashboard');
              }else{
                this.activatedRoute.params.subscribe(params => {
                     this.tokenId = params["id"];
                     this.tokenAddress=params["tokenAddress"];
                                 })
                       if(this.tokenId&&this.tokenAddress){
                         this.router.navigate(['/dashboard/invest', {'id': this.tokenId , "tokenAddress" : this.tokenAddress }]);
                       }else{
                         this.router.navigateByUrl('/dashboard/view-user');
                       }                
              }
          }else{                 
              //this.loginForm.reset();
               this.ng4LoadingSpinnerService.hide();  
              this.loading=false;   
              this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross'); 
               this.loginDetail.password=null;   
             
          }
       
        })
    }
    forgotPassword(){
       this.global_service.emitEvent("Signin page", "click", "Forgot password click", 1);
      this.router.navigateByUrl('/forgot-password');
    }

     home(){
      window.location.href='https://www.kryptual.com/';
    }

    
}
