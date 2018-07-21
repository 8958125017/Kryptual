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
   viewlengthtokensList:any;
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
   // changes 
     x:any;
   allparam:any;
   ongoingToken:boolean=false;
   upcommingToken:boolean=false;
   completeTimer:any={token : false};
   completeToken:boolean=false;
   nofoundStatus:boolean=false;
    constructor(public global_service: GlobalService,public router: Router, public fb:FormBuilder) {
      this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
      var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }
     this.tokenImage="assets/images/No-preview.png";
     this.counter=0;
     this.user=JSON.parse(localStorage.getItem('currentUser'));
     this.allparam="all"
     this.getToken(this.allparam);
     this.name = `Angular! v${VERSION.full}`
    }

      getToken(value:any){    
        this.nofoundStatus=false;    
        this.tokensList =[];
        this.onGoingList=[];
        this.upComming  =[];
        this.expierList =[];

       const url = this.global_service.basePath + 'api/getAllTokens?page='+value;
       this.global_service.GetRequest(url).subscribe(response=>{          

        $('#loader1').hide();
        $('#loader2').hide();
        $('#loader3').hide();
        $('#loader4').hide();          
     
       if(response[0].json.status==200){               
          this.tokenData=response[0].json.data;
          this.tokenLength=response[0].json.data.length;
          this.viewlengthtokensList= response[0].json.data.length;     
          if(this.tokenLength){
            for(var i=0;i<this.tokenData.length;i++){
             let objData ={
               id:'',
               tokenName :'',
               tokenTicker:'',
               tokenAddress:'',
               tokenSupply :'',
               startTime:'',
               tokenRate:'',
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
               objData.tokenRate=this.tokenData[i].tokenRate;
               objData.tokenImage=this.tokenData[i].tokenImage ? this.tokenData[i].tokenImage : './assets/img/No-preview.png';
               objData.startTime=this.tokenData[i].crowdsale[0].startTime;
               objData.endTime=this.tokenData[i].crowdsale[this.tokenData[i].crowdsale.length-1].endTime; 
               
               if(value=="all"){
                  //this.nofoundStatus=false;  
                  $('#loader1').hide();
                  this.ongoingToken=true;
                  this.counterDemoforAll(objData,i);
                  this.nofoundStatus=true;
                  this.tokensList.push(objData);
                   if( this.allTokensix < this.tokensList.length)
                     {
                        this.seemoreall=true;   
                        this.tokensList=this.tokensList.slice(0,this.allTokensix);
                     }else if( this.allTokensix > this.tokensList.length){
                       this.seemoreall=false;                     
                     }  
               }else if(value=="ongoing"){     
               //this.nofoundStatus=false;            
                  this.tokensList=[];
                  this.counterDemo(objData,i);
                  $('#loader1').hide();
                  this.nofoundStatus=true;
                  this.onGoingList.push(objData);
                          if( this.ongoingsix < this.onGoingList.length)
                       {
                        this.seemoreOngoing=true;
                        this.onGoingList=this.onGoingList.slice(0,this.ongoingsix);
                      }else if(this.ongoingsix > this.onGoingList.length) {
                       this.seemoreOngoing=false;
                     }              
               } else if(value=="upcomming"){
                  this.upcommingToken=true;
                  $('#loader1').hide();
                  this.nofoundStatus=true;
                  this.upComming.push(objData);
                  if( this.upcommingsix < this.upComming.length)
                     {
                       this.seemoreUpcomming=true;
                        this.upComming=this.upComming.slice(0,this.upcommingsix);
                     }else if( this.upcommingsix > this.upComming.length){
                       this.seemoreUpcomming=false;                     
                     }
               }else if(value=="expire"){
                  this.completeToken=true;
                  $('#loader1').hide();
                  this.nofoundStatus=true;
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
              }    
            }else{
              this.noToken1=true;
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

        // upcomming_invest_ICO(startDate:any,endDate:any){        
        //    let fromDate=moment(startDate).format("YYYY-MM-DD HH:mm");
        //    let toDate=moment(endDate).format("YYYY-MM-DD HH:mm");           
        //    this.global_service.showNotification('top','right','Crowdsale has not started yet!, crowdsale will be on ' + fromDate +" "+ 'to' +" "+ toDate,2,'ti-cross');
        // }

         seeMore(){
           if(this.allStatus){
             this.nofoundStatus=false;
           this.allTokensix+=this.extra;
            $('#loader1').show();             
            this.getToken("all");
          }
          if(this.ongoingStatus){
            this.nofoundStatus=false;
           this.ongoingsix+=this.extra;
            $('#loader2').show();             
            this.getToken("ongoing");
          }
          if(this.upcommingStatus){
            this.nofoundStatus=false;
           this.upcommingsix+=this.extra;
            $('#loader3').show();             
            this.getToken("upcomming");
          }
          if(this.expierStatus){
            this.nofoundStatus=false;
            this.completesix+=this.extra;
            $('#loader4').show();
            this.getToken("expire");
          }
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
         this.allparam="ongoing"
         this.getToken(this.allparam);
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
         this.allparam="upcomming"
         this.getToken(this.allparam);
        
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
         this.allparam="expire"
         this.getToken(this.allparam);
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
         this.allparam="all"
         this.getToken(this.allparam);
        }
         ngOnInit() {

        }
   
     
     counterDemo(objectData:any,i:any){                  
      this.x = setInterval(function() {
       this.countDownDateExample=new Date(objectData.endTime).getTime();     
        var now = new Date().getTime();        
       
        var distance = this.countDownDateExample - now;
    
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
       // Output the result in an element with id="demo"
            var element = document.getElementById("demo"+i);
              if(element){         
                 document.getElementById("demo"+i).innerHTML = days + "d " + hours + "h "
              + minutes  + "m " + seconds + "s (GMT +5:30)";
              }else{
                
                
              }
        // If the count down is over, write some text 
    
        if (distance < 0) {          
            clearInterval(this.x);
            var element = document.getElementById("demo"+i);
            if(element){
                   document.getElementById("demo"+i).innerHTML = "Crowdsale Completed";                  
            }
          }
        }, 1000);
      }
  

      counterDemoforAll(objectData:any,i:any){  
      i=++i
       if(this.allStatus==true)
         i = i+'a'
         else if(this.ongoingStatus==true) 
         i = i+'o'
        else if(this.upcommingStatus==true) 
         i = i+'u'
         var end=new Date(objectData.endTime).getTime();
     
        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distances1 = end - now;
    
       if(distances1>0)
        {
        objectData.ongingToken  = true;   
        if(new Date(objectData.startTime).getTime()-now>0)
          {
             objectData.upcommingToken = true;
             objectData.ongingToken  = false;
          }
        }
        else{
          objectData.completeToken = true;
        }                
       var self = this; 
      this.x = setInterval(function() {
       this.countDownDateExample=new Date(objectData.endTime).getTime();     
        var now = new Date().getTime();        
       
        var distance = this.countDownDateExample - now;
       
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
       // Output the result in an element with id="demo"
            var element = document.getElementById("demoall"+i);
              if(element){          
                 document.getElementById("demoall"+i).innerHTML = days + "d " + hours + "h "
              + minutes  + "m " + seconds + "s (GMT +5:30)";
               self.completeTimer.token=false;
              }else{
                
                
              }
        // If the count down is over, write some text 
        
        if (distance < 0) { 
                 
            clearInterval(this.x);
            var element = document.getElementById("demoall"+i);
            if(element){
                   document.getElementById("demoall"+i).innerHTML = "Crowdsale Completed";
                   
                    self.completeTimer.token=true;
            }
          }
        }, 1000);
      }

      ngAfterViewInit() {
       window.scrollTo(0, 0);
        
   }
      
}