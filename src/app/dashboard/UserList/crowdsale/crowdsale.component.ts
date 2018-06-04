
  import { Component, OnInit } from '@angular/core';
  import { GlobalService } from './../../../GlobalService';
  import * as moment from 'moment';
  import { Router, ActivatedRoute } from '@angular/router';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-crowdsale',
  templateUrl: './crowdsale.component.html',
  styleUrls: ['./crowdsale.component.scss']
})
export class CrowdsaleComponent implements OnInit {
public data:any;
public postData : any;
tokenaddress:any;
user: any;
crowdSaleToken:any[]=[];
tokenData : any;
tokenId : any;
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
facebookLink:any;
linkedinLink:any;
twitterLink:any;
fbStatus:boolean=true;
crowedSaleStatus:boolean=false
whitepaperStatus:boolean=false;
videosStatus:boolean=false;
videoUrlLink:any;
investDisable:boolean=false;
ongoingsupply:any = {supply:"0"};
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
                   var status = this.global_service.isLogedIn();
                   if(status==false){
                    this.router.navigateByUrl('/login');
                   }
                   
                  this.user=JSON.parse(localStorage.getItem('currentUser'));
                   this.currentdate = moment(new Date()).format("YYYY-MM-DD HH:mm");
                 if(this.user!=null||this.user!=undefined)
                   {

                  }
                  this.activatedRoute.params.subscribe(params => {
                   this.tokenId = params["id"];
                   this.getTokenInfo();
                  })

  }

  ngOnInit() {
            
  }

  gotToInvest(tokenId :any,tokenName:any,tokenAddress : any){
    this.global_service.emitEvent("Crowdsale Page", "Click",'Invest button'+ " "+tokenName, 1);
    this.router.navigate(['/dashboard/invest', { 'id': tokenId, "tokenAddress" : tokenAddress }]);
  }

  getTokenInfo(){
    this.crowdSaleToken =[];
     this.teamInfo=[];
      let postData = {
        tokenId : this.tokenId,
        userId : this.user._id,
      };
          const url = this.global_service.basePath + 'ETH/getTokenInfoByTokenId';
           this.global_service.PostRequest(url,postData).subscribe(response=>{                    
           if(response[0].json.json().status==200){
             if(response[0].json.json().data){
              this.tokenData=response[0].json.json().data;
              if(this.tokenData.generalInfo.team.length!=0){              
                   this.teamInfoStatus=true;
                   var teamData=response[0].json.json().data.generalInfo.team;                   
                   for(var data of teamData){
                     debugger
                     let objData={
                         teamImage : '',
                         linkdinLink: '',
                         designation: ''                                     
                   }                  
                   if(data.image){                     
                     objData.teamImage=data.image;
                   }else{                     
                     objData.teamImage="./assets/img/default-avatar.png";
                   }
                   objData.linkdinLink=data.linkdinname;
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
              
               if(response[0].json.json().data.generalInfo.facebook){
                this.facebookLink=response[0].json.json().data.generalInfo.facebook;
              }else{
                this.facebookLink="https://www.facebook.com";
              }
               
              if(response[0].json.json().data.generalInfo.linkedin){
                this.linkedinLink=response[0].json.json().data.generalInfo.linkedin;
              }else{
                this.linkedinLink="https://www.linkedin.com";
              }
              if(response[0].json.json().data.generalInfo.twitter){
                this.twitterLink=response[0].json.json().data.generalInfo.twitter;
              }else{
                this.twitterLink="https://www.twitter.com";
              }
              if(response[0].json.json().data.generalInfo.vedio){
                 this.videosStatus=true;
                this.videoUrlLink=response[0].json.json().data.generalInfo.vedio;
                this.videoUrlLink = this.videoUrlLink.replace("watch?v=", "embed/");                
                console.log(this.videoUrlLink);
              }

              if(this.tokenData.whitePaper){
                     this.whitepaperStatus=true;     
                     this.whitePaperImage=this.tokenData.whitePaper;//this.domSanitizer.bypassSecurityTrustResourceUrl(this.tokenData.whitePaper.changingThisBreaksApplicationSecurity)
               }

              var newStartDate = new Date(this.tokenData.startTime).getTime();
              var newEndDate=new Date(this.tokenData.endTime).getTime();
              this.currentdate=new Date().getTime() ;
             
                
              if(newEndDate<this.currentdate){
               this.allTokenStatus="Expired";
               this.investDisable=true; 
              }else if (newStartDate>this.currentdate){
                this.allTokenStatus="upcoming";
                this.investDisable=true; 
              }else{
                this.allTokenStatus="Ongoing";
                this.investDisable=false; 
              }
            
            var onGoingSupply = 0;
               for(var data of this.tokenData.crowdsale){ 
               debugger                
                console.log("data.endTime"+data.startTime+" "+data.endTime);
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
                        this.startTime=new Date(objData.startTime).getTime();
                        this.endTime=new Date(objData.endTime).getTime();                  
                   
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
            }
          }
        });
    }
    
    fbLInk(){
       this.global_service.emitEvent("Invest ICO Page", "Click", this.facebookLink, 1);
    }
     linkLInk(){
       this.global_service.emitEvent("Invest ICO Page", "Click", this.linkedinLink, 1);
    }
     twittLInk(){
       this.global_service.emitEvent("Invest ICO Page", "Click", this.twitterLink, 1);
    }
    

 
    
}
