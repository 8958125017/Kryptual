import { ElementRef,Component, OnInit ,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../../../GlobalService';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

 declare const $: any;
  @Component({
    selector: 'app-investIco',
    templateUrl: './investIco.component.html',
    styleUrls: ['./investIco.component.css']
  })

  export class InvestIcoComponent implements OnInit {
   public counter:number;
   public name:string;
   public tokenData:any;
   public user:any;
   tokensList:any[]=[];
   value = 1;
   isDataFound : boolean = false;
   tokenLink:any;

   // for filter
  public _items: Array<any>;
  public enableFilter: boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public tokenImage:string;
  public filterInput = new FormControl();
  public endtime: any;
  public startTime:any;

  currentDate:any;

  @Input() items: Observable<any[]>;
  content:any[]=new Array();

   complete:boolean=false;

    noToken1 :boolean=false;
    noToken2 :boolean=false;
    noToken3 :boolean=false;
    noToken4 :boolean=false;
   allStatus:boolean=true;
   ongoingStatus:boolean=false;
   upcommingStatus:boolean=false;
   expierStatus:boolean=false;
   allList : any[]=[];
   onGoingList : any[]=[];
   expierList : any[]=[];
   upComming : any[]=[];
   seemoreall:boolean=false;
   seemoreOngoing:boolean=false;
   seemoreUpcomming:boolean=false;
   seemoreExpired:boolean=false;
   extra:any=6;
   allTokensix:any=6;
   ongoingsix:any=6;
   upcommingsix:any=6;
   completesix:any=6;
   tokenLength:any;
    constructor(public global_service: GlobalService,public router: Router, public fb:FormBuilder) {
      this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
      var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }
      this.tokenImage="assets/images/No-preview.png";
     this.counter=0;
     this.user=JSON.parse(localStorage.getItem('currentUser'));
     this.getToken();
      this.name = `Angular! v${VERSION.full}`
    }

      getToken(){
        this.tokensList = [];
        this.onGoingList=[];
        this.upComming=[];
        this.expierList=[];

       const url = this.global_service.basePath + 'api/getAllTokens';
             this.global_service.GetRequest(url).subscribe(response=>{
               debugger
             $('#loader1').hide();
              $('#loader2').hide();
              $('#loader3').hide();
              $('#loader4').hide();            
             if(response[0].json.status==200){
               debugger
                this.tokenData=response[0].json.data;
                this.tokenLength=response[0].json.data.length;
                if(this.tokenLength){
                  for(var i=0;i<this.tokenData.length;i++){
                   let objData ={
                     id:'',
                     tokenName :'',
                     tokenTicker:'',
                     tokenAddress:'',
                     tokenSupply :'',
                     startTime:'',
                     endTime:'',
                     tokenImage:'',
                     completeToken:false,
                     ongingToken:false,
                     upcommingToken:false
                  };
                     objData.id = this.tokenData[i]._id ? this.tokenData[i]._id : '--';
                     objData.tokenName=this.tokenData[i].tokenName ? this.tokenData[i].tokenName : '--';
                     objData.tokenTicker=this.tokenData[i].tokenTicker ? this.tokenData[i].tokenTicker :'--';
                     objData.tokenAddress=this.tokenData[i].tokenAddress ? this.tokenData[i].tokenAddress : '--';
                     objData.tokenSupply=this.tokenData[i].tokenSupply ? this.tokenData[i].tokenSupply : '--';
                     objData.tokenImage=this.tokenData[i].tokenImage ? this.tokenData[i].tokenImage : './assets/img/No-preview.png';
                     objData.startTime=this.tokenData[i].startTime;
                     objData.endTime=this.tokenData[i].endTime;
                     this.endtime=this.tokenData[i].endTime;
                     let newStartDate = new Date(objData.startTime).getTime();
                     let newEndDate=new Date(objData.endTime).getTime();
                     let time=new Date().getTime() ;   
                     if(newEndDate<time){
                       this.complete=true;
                       objData.completeToken = true;
                       objData.ongingToken=false;
                       objData.upcommingToken=false;
                       this.expierList.push(objData);                      
                       if( this.completesix < this.expierList.length)
                       {
                        this.seemoreExpired=true;
                        this.expierList=this.expierList.slice(0,this.completesix);
                       }else if(this.completesix > this.expierList.length)
                       {
                        this.seemoreExpired=false;
                       }
                     }
                    else if(newStartDate>time){
                      this.complete=false;
                      objData.completeToken = false;
                      objData.upcommingToken=true;                     
                      this.upComming.push(objData);
                      if( this.upcommingsix < this.upComming.length)
                     {
                       this.seemoreUpcomming=true;
                        this.upComming=this.upComming.slice(0,this.upcommingsix);
                     }else if( this.upcommingsix > this.upComming.length){
                       this.seemoreUpcomming=false;                     
                     }

                     }else{
                       this.complete=false;
                       objData.completeToken = false;
                       objData.ongingToken=true;
                       objData.upcommingToken=false;                       
                       let endTimes=new Date(this.endtime).getTime()  ;                       
                       objData.endTime=moment(endTimes).format('LL');          
                       this.onGoingList.push(objData);
                        if( this.ongoingsix < this.onGoingList.length)
                     {
                       this.seemoreOngoing=true;
                        this.onGoingList=this.onGoingList.slice(0,this.ongoingsix);
                     }else if(this.ongoingsix > this.onGoingList.length) {
                       this.seemoreOngoing=false;
                     }
                     }
                        this.tokensList.push(objData);                        
                    if( this.allTokensix < this.tokensList.length)
                     {
                        this.seemoreall=true;   
                        this.tokensList=this.tokensList.slice(0,this.allTokensix);
                     }else if( this.upcommingsix > this.tokensList.length){
                       this.seemoreall=false;                     
                     }                  
                 }
                    
                } else{
                this.noToken1=true;
                }

                if (this.tokensList.length==0){
                  this.noToken1=true;
                } else{
                  this.noToken1=false;
                }
                  if(this.onGoingList.length==0){
                   this.noToken2=true;
                 }else{
                   this.noToken2=false;
                 }
                 
                 if(this.upComming.length==0){
                    this.noToken3=true;
                  }else{                    
                     this.noToken3=false;
                  }
                     if(this.expierList.length==0){
                    this.noToken4=true;
                  }else{ 
                     this.noToken4=false;
                  }                  
            }else{

              this.isDataFound = false;
            }
          })
       }
        invest_ICO(value:any){
            // this.global_service.emitEvent("Invest ICO Page", "Click",'Invest button'+ " "+tokenName, 1);
            this.router.navigate(['/dashboard/crowdsale', { 'id': value }]);
        }
        upcomming_invest_ICO(startDate:any,endDate:any){        
           let fromDate=moment(startDate).format("YYYY-MM-DD HH:mm");
           let toDate=moment(endDate).format("YYYY-MM-DD HH:mm");           
           this.global_service.showNotification('top','right','Crowdsale has not started yet!, crowdsale will be on ' + fromDate +" "+ 'to' +" "+ toDate,2,'ti-cross');
        }
        onGoing(){
         this.global_service.emitEvent("Invest ICO Page", "Click", "Ongoing Tab", 1);
         this.onGoingList=[];
         this.ongoingStatus=true;
         this.upcommingStatus=false;
         this.expierStatus=false;
         this.allStatus=false;
         this.noToken2=false;
         this.seemoreall=false;         
         this.seemoreUpcomming=false;
         this.seemoreExpired=false;
         this.seemoreOngoing=false;
         this.getToken();
        }

        upCommings(){
         this.global_service.emitEvent("Invest ICO Page", "Click", "Upcoming Tab", 1);
         this.upComming=[];
         this.ongoingStatus=false;
         this.upcommingStatus=true;
         this.expierStatus=false;
         this.allStatus=false;
         this.noToken3=false;
         this.seemoreall=false;
         this.seemoreOngoing=false;         
         this.seemoreExpired=false;
         this.seemoreUpcomming=false;
         this.getToken();
        }

        expier(){
         this.global_service.emitEvent("Invest ICO Page", "Click", "Expired Tab", 1);
         this.expierList=[];
         this.expierStatus=true;
         this.ongoingStatus=false;
         this.upcommingStatus=false;
         this.allStatus=false;
         this.noToken4=false;
         this.seemoreall=false;
         this.seemoreOngoing=false;
         this.seemoreUpcomming=false;
         this.seemoreExpired=false;
         this.getToken();
        }

        all(){
         this.global_service.emitEvent("Invest ICO Page", "Click", "All tab", 1);
         this.tokensList = [];
         this.allStatus=true;
         this.ongoingStatus=false;
         this.upcommingStatus=false;
         this.expierStatus=false;
         this.noToken1=false; 
         this.seemoreOngoing=false;
         this.seemoreUpcomming=false;
         this.seemoreExpired=false;
         this.seemoreall=false;
         this.getToken();
        }
         ngOnInit() {

         }
      seeMore(){
      if(this.allStatus){
       this.allTokensix+=this.extra;
        this.getToken();
      }
      if(this.ongoingStatus){
       this.ongoingsix+=this.extra;
        this.getToken();
      }
      if(this.upcommingStatus){
       this.upcommingsix+=this.extra;
        this.getToken();
      }
      if(this.complete){
       this.completesix+=this.extra;
        this.getToken();
      }

  }
}