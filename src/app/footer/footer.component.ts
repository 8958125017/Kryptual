import { ElementRef,Component, OnInit ,AfterViewInit,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit,AfterViewInit {
  contactForm: FormGroup;
  subscribeForm: FormGroup;
  public contactDetail:ContactDetail;
  year:any;
  subscribeDetail :any={
            email:''
           }
  constructor(
              private element: ElementRef,
              private global_service : GlobalService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  	) { 
           this.contactDetail = {
            email:'',
            name: '',
            subject:'',
            message: ''
           }

           this.year=moment(new Date()).format('YYYY');
  }

  ngOnInit() {
  	this.contactFormInit();
        this.subscribeFormInit();
  }

  contactFormInit(){
      this.contactForm = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
            'message': new FormControl('', Validators.required),
            'subject': new FormControl('', Validators.required),           
            'recaptchaReactive': new FormControl(null, Validators.required)
        });
    }
    subscribeFormInit(){
      this.subscribeForm = this.fb.group({
            'email': new  FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
        });
    }
    sendMessage(){    
         const url = this.global_service.basePath + 'api/contactUs';
         this.global_service.PostRequestUnautorized(url , this.contactDetail)
         .subscribe((response) => {
          if(response[0].json.status==200){
                this.contactForm.reset();
              this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');   
             }else{
              this.contactForm.reset();
               this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
        })
     }
     subscribe(){
         const url = this.global_service.basePath + 'api/subscribeUs';
         this.global_service.PostRequestUnautorized(url , this.subscribeDetail)
         .subscribe((response) => {
          if(response[0].json.status==200){
              this.subscribeForm.reset();
               this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');  

             }else{
               this.subscribeForm.reset();
                this.contactForm.reset();
                 this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
        })
     }
    
    ngAfterViewInit() {
       window.scrollTo(0, 0);
    }
    fbLink(){
      window.open('https://www.facebook.com',"_blank"); 
     }
     twitLink(){
     window.open('https://www.twitter.com',"_blank"); 
     }
}
