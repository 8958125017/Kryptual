import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { GlobalService } from '../GlobalService';
@Component({
  selector: 'app-signup-home',
  templateUrl: './signup-home.component.html',
  styleUrls: ['./signup-home.component.css']
})
export class SignupHomeComponent implements OnInit {
model: any = {};
   account: string;
    loading = false;
    year:any
  constructor(
        private router: Router,
        private global_service : GlobalService,       
        //private userService: UserService,
        ) { 
       this.year=moment(new Date()).format('YYYY');
  }

  ngOnInit() {

   
  }
  signup() {
        this.loading = true;
    }

   home(){
     window.location.href='https://www.kryptual.com/';
    }
    invester(){
      this.global_service.emitEvent("Signup Page", "Click", "Investor signup select", 1);
      this.router.navigate(['/signup', {'paramKey': 'Investor'}]);
    }

    corporate(){
      this.global_service.emitEvent("Signup Page", "Click", "Corporate signup select", 1);
      this.router.navigate(['/signup', {'paramKey': 'Business'}]);
    }

}



