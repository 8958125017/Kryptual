import { Component, OnInit,NgModule,Injectable,OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Router} from '@angular/router';
 import { GlobalService } from './GlobalService';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

	constructor( private global_service:GlobalService,private router: Router){

       // let postData = {
       //                 website : "www.kryptual.com",
       //                };
       //    const url = this.global_service.basePath + 'api/checkWebsiteStatus';
       //     this.global_service.PostRequest(url,postData).subscribe(response=>{
       //     	   if(response[0].status==200){
       //            if(response[0].json.json().status==false){
       //              this.router.navigateByUrl('/undermaintenance');
       //            }
       //       	}
       //     	});
	}
    

	ngOnInit() {}
}
