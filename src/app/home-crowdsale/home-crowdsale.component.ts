  import { Component, OnInit } from '@angular/core';
  import { GlobalService } from '../GlobalService';
  import * as moment from 'moment';
  import { Router, ActivatedRoute } from '@angular/router';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  declare const $: any;
  import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home-crowdsale',
  templateUrl: './home-crowdsale.component.html',
  styleUrls: ['./home-crowdsale.component.scss'],
  styles: [`
    ngb-progressbar {
      margin: 2rem 0;
         float: left;
    width: 100%;
}
  `]
})
export class HomeCrowdsaleComponent implements OnInit {

public data:any;
public postData : any;
tokenaddress:any;
user: any;
tokenData : any;
tokenId : any;
crowdSaleToken:any[]=[];
whitePaperImage:any;
startTime:any;
endTime:any;
lastDate:any;
currentdate:any;
tokenStatus:any;
genTokenStatus:any;
teamInfo:any[]=[];
teamInfoStatus:boolean=false;
milestoneStatus:boolean=false;
milestoneInfo:any;
allTokenStatus:any;
website:any;
description:any;
status:any;
active:boolean=true;
userName:any;
whitepaperStatus:boolean=false;
videosStatus:boolean=false;
videoUrlLink:any;
investDisable:boolean=false;
ongoingsupply:any = {supply:"0"};
progress:any=0;
progressType:any="success";
tokenRate:any;
socialUrl:any;
  constructor(
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,              
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,            
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
                private domSanitizer :DomSanitizer
             )
                 { 
                   this.status = this.global_service.isLogedIn();
                   if(this.status==false){
                    this.active=false;                    
                   }
                   else{
                       this.active=true;
                       this.user=JSON.parse(localStorage.getItem('currentUser'));
                       this.userName=this.user.firstName + " "+this.user.lastName;
                    }
                  this.user=JSON.parse(localStorage.getItem('currentUser')); 
                 

       this.activatedRoute.params.subscribe(params => {
           this.tokenId = params["id"];           
           this.getTokenInfo();
        })
        this.socialUrl="http://52.66.185.83/#/homecrowdsale;id="+this.tokenId ;      
      }

    ngOnInit() {

    }

  
 getTokenInfo(){
    this.crowdSaleToken =[];
     this.teamInfo=[];
      let postData = {
        tokenId : this.tokenId      
      };
          const url = this.global_service.basePath + 'api/getTokenInfoByTokenId';
           this.global_service.PostRequest(url,postData).subscribe(response=>{ 
           if(response[0].json.json().status==200){            
            this.progress=response[0].json.json().tokenSold*10;             
             if(this.progress == null ||this.progress == undefined || this.progress <= 25){
                 this.progressType="success";         
             }else if(response[0].json.json().tokenSold <= 50){
                this.progressType="info";
             }else if(response[0].json.json().tokenSold <= 75){
                this.progressType="warning";
             }else if(response[0].json.json().tokenSold <= 100){
               this.progressType="danger";
             }
             if(response[0].json.json().data){               
              this.tokenData=response[0].json.json().data;
              if(this.tokenData.tokenRate){
                 this.tokenRate=(1/this.tokenData.tokenRate).toFixed(6);
               }           
              if(response[0].json.json().data.generalInfo.team.length!=0){
                   this.teamInfoStatus=true;
                   var teamData=response[0].json.json().data.generalInfo.team;                   
                   for(var data of teamData){
                     let objData={
                         teamImage : '',
                         linkdinName: '',
                         designation: ''                                     
                   }                  
                   if(data.image){
                     objData.teamImage=data.image;
                   }else{
                     objData.teamImage="./assets/img/default-avatar.png";
                   }
                   objData.linkdinName=data.linkdinName;
                   objData.designation=data.designation;
                   this.teamInfo.push(objData);
                   }

              }else{
                   this.teamInfoStatus=false;
              }
              if(response[0].json.json().data.generalInfo.milestone.length!=0){
                this.milestoneStatus=true;
                 this.milestoneInfo=response[0].json.json().data.generalInfo.milestone;
              }
              else{
                this.milestoneStatus=false;
              }
              if(!this.tokenData.tokenImage){
                this.tokenData.tokenImage="./assets/img/No-preview.png";
              }
              if(!this.tokenData.tokenRate){
                this.tokenData.tokenRate=1;
              }
              if(response[0].json.json().data.generalInfo.website){
                this.website=response[0].json.json().data.generalInfo.website;
              }else{
                this.website=" ";
              }

              if(response[0].json.json().data.generalInfo.description){
                this.description=response[0].json.json().data.generalInfo.description;
              }else{
                this.description="--";
              }
              
               
               if(response[0].json.json().data.generalInfo.vedio){
                 this.videosStatus=true;
                this.videoUrlLink=response[0].json.json().data.generalInfo.vedio;
                this.videoUrlLink = this.videoUrlLink.replace("watch?v=", "embed/"); 
              }
               
               if(this.tokenData.whitePaper){
                     this.whitepaperStatus=true;     
                     this.whitePaperImage=this.tokenData.whitePaper;//this.domSanitizer.bypassSecurityTrustResourceUrl(this.tokenData.whitePaper.changingThisBreaksApplicationSecurity)
               }
            
              let newStartDate = new Date(this.tokenData.startTime).getTime() ;              
              let newEndDate=new Date(this.tokenData.endTime).getTime() ;             
              this.currentdate=new Date().getTime()  ;
              if(newEndDate<this.currentdate){
               this.allTokenStatus="Expired";
               this.investDisable=true;
              }else if (newStartDate>this.currentdate){
                this.allTokenStatus="upcoming";
                this.investDisable=true;
              }else{
                this.allTokenStatus="Ongoing";
              }
              var startDate=response[0].json.json().data.startTime;
              var endDate =response[0].json.json().data.endTime;  


              var onGoingSupply = 0;          
              for(var data of this.tokenData.crowdsale){              
                let objData ={
                              tierName :'',
                              startTime:'',
                              endTime:'',
                              status:'',
                              supply:''
                            };
                        objData.tierName=data.tier;
                        objData.startTime=data.startTime;
                        objData.endTime=data.endTime;                      
                        this.startTime=new Date(objData.startTime).getTime()  ;
                        this.endTime=new Date(objData.endTime).getTime() ;                  
                   
                   if(this.currentdate<this.startTime)
                   {                     
                     objData.status="Upcoming";
                   }else if(this.currentdate>this.endTime){
                        objData.status="Expired"; 
                   }
                   else {
                      onGoingSupply = data.supply;        
                       objData.status="Ongoing";  
                   }
                   this.ongoingsupply.supply = onGoingSupply; 
                   this.crowdSaleToken.push(objData);
              }
             if(this.tokenData.whitePaper){
               this.whitepaperStatus=true;
              this.whitePaperImage=this.tokenData.whitePaper;
             }
            }
          }
        });
      }



    
    gotToInvestToken(tokenId :any,tokenName:any,tokenAddress : any){    
                            
                            if (this.user){
                            this.router.navigate(['/dashboard/invest', { 'id': tokenId, "tokenAddress" : tokenAddress }]);
                            }
                            else if(!this.user && this.tokenId){
                              $('#smallModal').modal('show');
                          }
                          else{
                              $('#smallModal').modal('show');
                            }
    }
    
    logIngotToInvestToken(){
      this.router.navigate(['/login', {'id': this.tokenId , "tokenAddress" : this.tokenData.tokenAddress}]);
    }
     ngAfterViewInit() {
       window.scrollTo(0, 0);
    }
   }


