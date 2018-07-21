import { ElementRef,Component, OnInit ,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
declare const $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  
  constructor(
        private element: ElementRef,
        private global_service : GlobalService,
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        )  {
          
           
         }

  ngOnInit() {
  	
  }

 ngAfterViewInit() {
       window.scrollTo(0,0);
   }
}
