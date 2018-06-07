import { Component, OnInit,NgModule,Injectable,OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { Router} from '@angular/router';
 import { GlobalService } from './GlobalService';
 import  * as ico  from './ico_constant';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public toasterconfig : ToasterConfig = 
      new ToasterConfig({
          showCloseButton: true, 
          tapToDismiss: false, 
          timeout: 2000
      });
 
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
    

  	ngOnInit() {
      // use for auto logout if user do not hover mouse and press key
      var idleInterval
      var self = this;
      var idleTime = 0;
      $(document).ready(function () {
       idleInterval = setInterval(timerIncrement, 60000); // 1 minute

      $(this).mousemove(function (e) {
          idleTime = 0;
      });
      $(this).keypress(function (e) {
          idleTime = 0;
      });
    });

  function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > ico.sessionTime.time) { // 20 minutes    
     let postData = {
                    userId: JSON.parse(localStorage.getItem('currentUser'))._id
                };
                const url = self.global_service.basePath + 'api/logout';
                clearInterval(idleInterval); 
                self.global_service.PostRequest(url, postData).subscribe(response => {
                  self.global_service.showNotification('top','right','Your session has expired due to inactivity',2,'ti-cross');
                    if (response[0].json.status == 200) {                        
                        localStorage.clear();
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_link');                                               
                        self.router.navigateByUrl('/login');
                        window.location.reload();
                    } else {
                      
                    }
                })
              }
            }
      }
}
