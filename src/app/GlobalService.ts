import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

declare let ga: Function;
declare var $: any;
@Injectable()
export class GlobalService {       
   private toasterService: ToasterService; 
    user:any;
    userInfo: any;
    userType:any;
    public basePath: string;
    public basePathforReact: string;
    public refresh_token: string;  
    public headers: Headers;
    public requestoptions: RequestOptions;
    public res: Response;  
    public loggedInObs: Rx.Subject<any> = new Rx.Subject<any>();
    isLogedInUser:boolean;
    adminStatus:any[] = [ {id:1,status:'Active'},
                          {  id:2,status:'Inactive'}
                        ]


    constructor(
                public http: Http,
                public router: Router,
                 toasterService:ToasterService
               ) {
        this.extarsOnLoad();
        this.toasterService = toasterService
   
    }


    /*Check form valid or not by passing form objecrt to it*/
    isFormValid(formName){
        if(formName.valid) return true;
        else return false;
    }
    /*End section*/
    

    showNotification(from, align,message, type, body) {
        this.toasterService.clear();
        debugger;
         if(type==2){
          this.toasterService.pop('success', "", message);
         }
         if(type==4){
          this.toasterService.pop('error', "", message);
         }
         if(type==3){
          this.toasterService.pop('success', "", message);
         }
          
    }

    upload(fileToUpload: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        return this.http.post("/api/uploadFile", input);
    }

    // start google analytics

     public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {                   
                                                 ga('send', 'event', {
                                                      eventCategory: eventCategory,
                                                      eventLabel: eventLabel,
                                                      eventAction: eventAction,
                                                      eventValue: eventValue
                                                    });
                                               }


    public extarsOnLoad() {      
        this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
         
         // LOCAL Server Path
        this.basePath = "http://103.201.142.41:4001/";
        this.basePathforReact ="http://103.201.142.41:3000/";

       // LOCAL AWS Server Path
       
        // this.basePath = "http://52.66.185.83:4000/";
        //  this.basePathforReact ="http://52.66.185.83:3000/";
        
       //AWS Path

       // this.basePath = "https://www.kryptual.com:4000/";
         // this.basePathforReact ="http://18.188.33.245:3000/";

       //Kunvar
       // this.basePath = "http://192.168.0.63:4000/";




        /*Required for Global Level in whole app*/
        this.userType = this.userInfo.UserRole;
        this.loggedInObs.subscribe(res => {
            this.userInfo = JSON.parse(localStorage.getItem('currentUser')) || {};
            this.userType = this.userInfo.UserRole;
        })
    }

    public getRequsetOptions(url: string): RequestOptions {
        let headers;
        if (localStorage.getItem('token')) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("token",this.userInfo.token);
        }
        else {
              this.consoleFun('Unautorized Request !');
             }
        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });
        return requestoptions;
    }

  

    public PostRequestUnautorized(url: string, data: any): any {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions))
        .map((res: Response) => {
            return [{ status: res.status, json: res.json() }]
        })
        .catch((error: any) => {
            return Observable.throw(error);
        });
    }

    public PostRequest(url: string, data: any, flag?: any): any {
        var TOKEN=localStorage.getItem('token');
        let headers;
        headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("authorization","jwt "+TOKEN);
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        })

        return this.http.request(new Request(this.requestoptions))
        .map((res: Response) => {
            if(res.status==200){
               return [{ status: res.status, json: res }]
            }
        })
        .catch((error: any) => {
            if(error.status == 401){
                localStorage.clear();
                this.showNotification('top','right',error.json().err.object,4,'ti-cross');
                this.router.navigateByUrl('/login');
            }
           //   if(error.status===0){
           //     this.showNotification('top','right','Unable to connect to the internet',4,'ti-cross');
           // }
            return Observable.throw(error);
        });
    }

    public GetRequest(url: string): any {
        return this.http.request(new Request(this.getRequsetOptions(url)))
        .map((res: Response) => {
            let jsonObj: any;
            if (res.status === 204) {
                jsonObj = null;
            }
            else {
                jsonObj = res.json()
            }
            return [{ status: res.status, json: jsonObj }]
        })
        .catch(error => {
            if (error.status == 0)
                this.consoleFun('error here', error);
            return Observable.throw(error);
        });
    }

    customUrlParser(url){
        let url2: string;
        if (url.includes("?"))
            { url2 = url + '&format=json'; }
        else
            { url2 = url + '?format=json' }

        return url2;
    }

    // Console Function
    consoleFun(a?, b?, c?, d?, f?, g?): void {
        // console.log(a, b, c, d, f, g);
    }

    // clearMessage(){
    //     this.toasterService.clear();
    // }

    public logout(){
        const url = this.basePath + "admin/logout" ;
        let obj = {token:this.userInfo.token};
        this.PostRequest(url,obj).subscribe(res => {
            this.consoleFun(res[0].json.json());
            localStorage.clear();
            this.router.navigateByUrl('/login');
        }, err => {
            this.consoleFun(err);
        })
    }


    /*Close PopUp*/
    closePopUp(value,display){
        value.reset();
        display = false;
    }

    /*Scroll to top*/
    scrollBar(){
    $("html, .main-panel").animate({ scrollTop: 0 },'fast');
    }

    isLogedIn(){
         this.user=JSON.parse(localStorage.getItem('currentUser'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
    }

}
