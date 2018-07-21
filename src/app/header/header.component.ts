import { ElementRef,Component, OnInit ,AfterViewInit,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 userName:any;
 public user:any;
 active:any;
 userAdmin:boolean=false;
 constructor(
private element: ElementRef,
        private global_service : GlobalService,
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) { 
    var status = this.global_service.isLogedIn();
      if(status==false){
            this.active=false;
           }
         else{
           this.active=true;
           this.user=JSON.parse(localStorage.getItem('currentUser'));
           if(this.user.accountType ==="Admin"){
             this.userAdmin=true;
           }
         //  this.userName=this.user.firstName + " "+this.user.lastName;
         }
      
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
       window.scrollTo(0, 0);
    }

  logout() {    
            let postData = {
                    ETHaddress: this.user.EthAddress,
                    userId: this.user._id
                };

                const url = this.global_service.basePath + 'api/logout';
                this.global_service.PostRequest(url, postData).subscribe(response => {
                    if (response[0].json.status == 200) {                      
                        localStorage.clear();
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_link');
                        this.router.navigateByUrl('/login');
                       

                    } else {

                      
                    }

                })
    }
}
