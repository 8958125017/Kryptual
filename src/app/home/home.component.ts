import { ElementRef,Component, OnInit ,AfterViewInit,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public counter:number;
  public name:string;
  public tokenData:any;
  public user:any;
  public tokensList:any[]=[];
  value = 1;
  isDataFound : boolean = false;
  tokenLink:any;
   // for filter
  public _items: Array<any>;
  public enableFilter: boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  //private _subscription: Subscription;
  @Input() items: Observable<any[]>;
  content:any[]=new Array();
  userName:any;
  active:boolean=true; 
  public status:any;
  complete:boolean=false;
  noToken1 :boolean=false;
  allStatus:boolean=true;
  ongoingStatus:boolean=false;
  upcommingStatus:boolean=false;
  expierStatus:boolean=false;
  seemoreall:boolean=false;
  x:any;



  public endtime: any;
  public startTime:any;
  currentDate:any;
  extra:any=8;
  allTokensix:any=8;  
  tokenLength:any; 
  allparam:any;

  viewStatus:any=[];
  timerStatus:any=[];
  upcommStatus:any=[];
  expireStatus:any=[];
    constructor(
        private element: ElementRef,
        private global_service : GlobalService,
        private http: Http,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,private location: Location
        ) {
           this.user=JSON.parse(localStorage.getItem('currentUser')); 
           this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
           this.nativeElement = element.nativeElement;
           this.sidebarVisible = false;
           this.status = this.global_service.isLogedIn();
           if(this.status==false){
            this.active=false;
           }
         else{
           this.active=true;
           this.user=JSON.parse(localStorage.getItem('currentUser'));
           this.userName=this.user.firstName + " "+this.user.lastName;
         }
      this.counter=0;
      this.allparam="all"
      this.getToken(this.allparam);  
      
       // this.activatedRoute.params.subscribe(params => {
       //     var routeId = params["route_Id"];
       //     if(routeId){
       //      window.location.reload();
       //     }          
           
       //  })   
    }

  invest_ICO(value:any){
    if(this.user==null||this.user==undefined){
        this.tokenLink=1
         localStorage.setItem('token_link', this.tokenLink);
         this.router.navigate(['/login'])
    }
    else{
      window.open(this.global_service.basePathforReact+"invest?addr="+value);
    }
  }


    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if( localStorage.getItem('firstLoad') )
               {                
               window.location.reload();
                   }
         window.scrollTo(0, 0);
    }

     
    
     getStarted(){
       if(this.status==false){
       this.router.navigateByUrl('/signupHome');
       }else{
       this.router.navigateByUrl('/dashboard/view-user');
       }
     }


     sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }


        onGoing(){
         $('#loader1').show();
         this.tokensList = [];
         this.allTokensix=8;
         this.allStatus=false;    
         this.ongoingStatus=true;
         this.upcommingStatus=false;
         this.expierStatus=false;         
         this.noToken1=false;          
         this.seemoreall=false;
         this.allparam="ongoing"
         this.getToken(this.allparam);
        }

        upCommings(){  
          $('#loader1').show();
          this.tokensList = []; 
          this.allTokensix=8;      
         this.ongoingStatus=false;
         this.upcommingStatus=true;
         this.expierStatus=false;
         this.allStatus=false; 
         this.noToken1=false; 
         this.seemoreall=false;
         this.allparam="upcomming"
         this.getToken(this.allparam);
        }

        expier(){ 
         $('#loader1').show();
         this.tokensList = [];
         this.allTokensix=8;
         this.allStatus=false;
         this.ongoingStatus=false;
         this.upcommingStatus=false;
         this.expierStatus=true;
         this.noToken1=false; 
          this.seemoreall=false;
         this.allparam="expire"
         this.getToken(this.allparam);
        }

        all(){
         $('#loader1').show();
         this.tokensList = [];
         this.allTokensix=8;
         this.allStatus=true;
         this.ongoingStatus=false;
         this.upcommingStatus=false;
         this.expierStatus=false;
         this.noToken1=false;       
         this.seemoreall=false;
         this.allparam="all"
         this.getToken(this.allparam);
        }

        getToken(value:any){
        this.tokensList = []; 
        const url = this.global_service.basePath + 'api/getAllTokens?page='+value;
          this.global_service.GetRequest(url).subscribe(response=>{
             $('#loader1').hide();
         
             if(response[0].json.status==200){
                this.tokenData=response[0].json.data;
                this.tokenLength=response[0].json.data.length;
                if(this.tokenLength)
                {
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
                     this.counterDemo(objData,i);
                     this.tokensList.push(objData);
                     if( this.allTokensix < this.tokensList.length)
                     {
                        this.seemoreall=true;   
                        this.tokensList=this.tokensList.slice(0,this.allTokensix);
                     }else if( this.allTokensix > this.tokensList.length){
                       this.seemoreall=false;                     
                     }
                 }   
                    
                } else{
                  this.noToken1=true;
                  // this.counter+=10;
                }
            }else{
              this.isDataFound = false;
            }
          })
       }

      seeMore(){          
                $('#loader1').show();   
                if(this.allStatus){
                 this.allTokensix+=this.extra;
                  this.allparam="all"
                  this.getToken("all");
                }

                else if(this.ongoingStatus){
                 this.allTokensix+=this.extra;
                  this.allparam="ongoing"
                  this.getToken(this.allparam);
                }

                else if(this.upcommingStatus){
                 this.allTokensix+=this.extra;
                  this.allparam="upcomming"
                   this.getToken(this.allparam);
                }

                else if(this.expierStatus)
                {
                 this.allTokensix+=this.extra;
                  this.allparam="expire"
                 this.getToken(this.allparam);
                }

  }

    view_ICO(data:any){
            this.router.navigate(['/homecrowdsale', { 'id': data }]);
        }
       
      counterDemo(objectData:any,i:any){ 
        i=++i 
        if(this.allStatus==true)
        i = i+'a'
        else if(this.ongoingStatus==true) 
        i = i+'o'
        else if(this.upcommingStatus==true) 
         i = i+'u'  
        //-----------------------------------------------------------------------------------
      var end=new Date(objectData.endTime).getTime();     
        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distances = end - now;
    
       if(distances>0)
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
      //------------------------------------------------------------------------------------------
      // if(this.x)
      // window.clearInterval(this.x);              
      this.x = setInterval(function() {
       this.countDownDateExample=new Date(objectData.endTime).getTime();     
        var now = new Date().getTime();        
        // Find the distance between now an the count down date
        var distance = this.countDownDateExample - now;      
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
       // Output the result in an element with id="demo"
            var element = document.getElementById("demo3"+i);
              if(element){          
                 document.getElementById("demo3"+i).innerHTML = days + "d " + hours + "h "
              + minutes  + "m " + seconds + "s (GMT +5:30)";
              }else{
                
                // alert("Hello else");
              }

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(this.x);
            var element = document.getElementById("demo3"+i);
            if(element){          
             document.getElementById("demo3"+i).innerHTML = "Crowdsale Completed";
            }
          }
        }, 1000);
      }
       ngAfterViewInit() {
        window.scrollTo(0, 0);
       localStorage.removeItem('firstLoad');
   }
          
}
