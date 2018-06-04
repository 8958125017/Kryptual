import { Component, OnInit,NgModule,AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import * as moment from 'moment';
import { GlobalService } from '../GlobalService';
import  * as ico   from'../ico_constant';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
    selector : 'list-ico',
    templateUrl: 'list-ico.component.html'
})

export class ListicoComponent implements OnInit,AfterViewInit {
   startDateTime:any;tokenValue
   endDateTime:any;
   icowizards:ListIcoWizards;
   selectedTeamImage : any;
   selectedTokenImage:any;   
   registerForm: FormGroup;   
   contactForm: FormGroup;
   subscribeForm: FormGroup;
   public contactDetail:ContactDetail;
   public subscribeDetail:ContactDetail;
   public user:any;
   dasbordstatus:boolean=false;
   tokImage:boolean=false;
   selectedWhitePaperImage:any;
   whitepaperStatus:boolean=false;
   teamForm:boolean=true;
   teamTabel:boolean=false;
   milestoneForm:boolean=true;
   milestoneTabel:boolean=false;
   reservedTokenForm:boolean=true;
   reservedTokenTabel:boolean=false;
   tierForm:boolean=true;
   tierTabel:boolean=false;
   currentDate:any;
   currentDate2:any;
   boolRoute:boolean=false;
   generalInfo:any={                     
                      description : "",
                      vedio       : "",
                      website     : "",
                      facebook    : "",
                      twitter     : "",
                      linkedin    : "",
                      companyName : "",
                      team        : [],
                      milestone   : []
                    };

   milestone : any= {
                     milestone1 : "",
                     milestonedate : new Date()
                    };

   team:any={
                image         : "",
                teamNames     : "",
                linkedinname  : "",
                designation   : ""
              }


   token:any={
                tokenImage              :  "",
                name                    :  "",
                ticker                  :  "",
                tokenRate               :  "",
                tokenSupply             :  0,
                tokenDecimals           :  "",
                tokenValue              :  "",               
              }


   reservedTokens : any={
                              val : "",
                              addr : ""
                              //dim : ""
                             }

   reservedElements: any={
                          _owner : null,
                          props : {
                              val : "",
                              dim : "",
                              addr : "",
                              num : 0
                          },
                          ref : null,
                          key : "0"
                         }

   pricingStrategy:any={
                         rate: '',
   
   }

    crowdsale : any={  
                      walletAddress:"",
                      updatable: "off",
                      whiteListElements :[],
                      whitelist:  [],
                      whiteListInput: {
                          addr      : '',
                          min       : 0,
                          mx        : 0
                      },
                      tier: "tier1",
                      supply: "",
                      endTime : "",
                      startTime : ""
                    };
    
     company_email:any={
                         email: '',
                     }

    whitelist: any={
                    address:"",
                    min: "",
                    max:""
                    }
    data:any={
              crowdsaleAddress:"",
              tokenAddress:""
    }
    

    inversterMinCap:any={
                          mincap:""
                        }
    public imageDataAfterupload:any;
    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,     
        private activatedRoute: ActivatedRoute,
        private global_service : GlobalService,
        private element: ElementRef,
        private domSanitizer :DomSanitizer,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
       ) 
    { 

      this.user=JSON.parse(localStorage.getItem('currentUser'));
      if(this.user!=null||this.user!=undefined){
        this.dasbordstatus=true;
        this.crowdsale.walletAddress=this.user.EthAddress;
      }else{
        this.dasbordstatus=false;
      }         
      this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
         this.currentDate2= moment(new Date()).format("YYYY-MM-DD");
         this.startDateTime=moment(new Date()).add(10, 'minute');
         this.crowdsale.startTime= new Date(this.startDateTime);
         this.endDateTime=moment(this.crowdsale.startTime).add(4,'day') ;
         this.crowdsale.endTime=new Date(this.endDateTime);     
          this.contactDetail = {
                email:'',
                name: '',
                subject:'',
                message: ''

               }
               this.subscribeDetail = {
                email:''
               }
          this.icowizardsDetails();
    }

    ngOnInit() {
      this.contactFormInit();
      this.subscribeFormInit();
      this.listIcoForm();
    }

    pushtier(){

     if(!this.crowdsale.tier){
        this.global_service.showNotification('top','right',"please fill Crowdsale Setup Name ",4,'ti-cross');
                return;
           }else if(!this.crowdsale.walletAddress){
        this.global_service.showNotification('top','right',"please fill Wallet Address ",4,'ti-cross');
                return;
           }else if(!this.crowdsale.startTime){
        this.global_service.showNotification('top','right',"please fill Start Time ",4,'ti-cross');
                return;
           }else if(!this.crowdsale.endTime){
        this.global_service.showNotification('top','right',"please fill End Time ",4,'ti-cross');
                return;
           }else if(!this.pricingStrategy.rate){
        this.global_service.showNotification('top','right',"please fill Rate ",4,'ti-cross');
                return;
           }else if(!this.crowdsale.supply){
        this.global_service.showNotification('top','right',"please fill Supply ",4,'ti-cross');
                return;
           }


                this.crowdsale.startTime=moment(this.crowdsale.startTime).format().substring(0, 19); 
                  // this.crowdsale.startTime= moment(this.crowdsale.startTime).format('YYYY-MM-DD'+"T"+'HH:mm:s');
                this.crowdsale.endTime=moment(this.crowdsale.endTime).format().substring(0, 19);
                // this.crowdsale.startTime= moment(this.crowdsale.startTime).format('YYYY-MM-DD HH:mm');
                 
                // this.crowdsale.endTime= moment(this.crowdsale.endTime).format('YYYY-MM-DD HH:mm'); 
                if(!this.crowdsale.tier){
                      this.global_service.showNotification('top','right','tier should be requiered',4,'ti-cross');
                    }
                 else if(!this.crowdsale.startTime)
                    {
                      this.global_service.showNotification('top','right','startTime should be requiered',4,'ti-cross');
                      return;
                    }
                     else if(!this.crowdsale.endTime)
                    {
                      this.global_service.showNotification('top','right','endTime should be requiered',4,'ti-cross');
                      return;
                    }
                    else if(this.crowdsale.startTime<this.currentDate){
                      this.global_service.showNotification('top','right','Start date should be greater than current date',4,'ti-cross');
                      return;
                    }
                    else if(this.crowdsale.endTime<this.crowdsale.startTime){
                      this.global_service.showNotification('top','right','End date should be greater than start date',4,'ti-cross');
                      return;
                    }

                   if(this.crowdsale.walletAddress[0]!=='0'||this.crowdsale.walletAddress[1]!=='x'){
                    this.global_service.showNotification('top','right','address should start from 0x',4,'ti-cross');
                    return;
                  }else if(this.crowdsale.walletAddress.length<42){
                     this.global_service.showNotification('top','right','address length should be 42',4,'ti-cross');
                     return;
                  }else{

                           this.tierForm=false;
                           this.tierTabel=true;
                                    
                                 let data={
                                     tier : this.crowdsale.tier,
                                     supply : this.crowdsale.supply.toString(),
                                     startTime : this.crowdsale.startTime,
                                     endTime : this.crowdsale.endTime,
                                     whitelistdisabled : "yes",
                                     updatable: "off",
                                     whiteListElements :[],
                                     whitelist:  [],
                                     whiteListInput: {
                                                       addr      : '',
                                                       min       : 0,
                                                       mx        : 0
                                                     },
                                  }
                                     let data1={
                                     rate : this.pricingStrategy.rate.toString()
                                    }                                   
                                                         
                                   if(this.icowizards.crowdsale.crowdsale.length)
                          {
                            if(this.icowizards.crowdsale.crowdsale[this.icowizards.crowdsale.crowdsale.length-1].endTime>data.startTime)
                            {
          
                             this.global_service.showNotification('top','right','Next tier start date should be greater than previous token End Date',4,'ti-cross');
                            }
                            else
                            {
                               this.icowizards.crowdsale.pricingStrategy.push(data1); 
                             this.icowizards.crowdsale.crowdsale.push(data);
                             
                            }
                          }
                          else
                          {
                             this.icowizards.crowdsale.pricingStrategy.push(data1); 
                           this.icowizards.crowdsale.crowdsale.push(data);
                           this.global_service.showNotification('top','right','Tier add successfully',2,'ti-cross');
                          }
                  }
                       
            
                           
             }

   poptier(itemNo1){
        var index = this.icowizards.crowdsale.crowdsale.findIndex(function(o,index){
          return index === itemNo1;
       })
       if (index !== -1) {
         this.icowizards.crowdsale.crowdsale.splice(index, 1);
         this.icowizards.crowdsale.pricingStrategy.splice(index, 1);
       }
       if(this.icowizards.crowdsale.crowdsale.length==0){
          this.pricingStrategy={
                         rate: '',
   
      }
            this.crowdsale={  
                      walletAddress:"",
                      updatable: "off",
                      whiteListElements :[],
                      whitelist:  [],
                      whiteListInput: {
                          addr      : '',
                          min       : 0,
                          mx        : 0
                      },
                      tier: "tier1",
                      supply: "",
                      endTime : "",
                      startTime : ""
                    };
            this.tierForm=true;
         this.tierTabel=false;
         }
    }

    addMoretier(){
      this.pricingStrategy={
                         rate: '',
   
   }
      this.crowdsale={  
                      walletAddress:this.crowdsale.walletAddress,
                      updatable: "off",
                      whiteListElements :[],
                      whitelist:  [],
                      whiteListInput: {
                          addr      : '',
                          min       : 0,
                          mx        : 0
                      },
                      tier: "tier1",
                      supply: "",
                      endTime : "",
                      startTime : ""
                    };
         this.tierForm=true;
         this.tierTabel=false;
    }




   

    tokenImage(event){
    this.ng4LoadingSpinnerService.show();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedTokenImage = e.target.result;
      var tokImage=this.selectedTokenImage.split(',')[1]      
      let postData={
        image : tokImage
      }
     const url=this.global_service.basePath + 'merchandise/imageUpload';
            this.global_service.PostRequest(url, postData).subscribe(response => {
              this.ng4LoadingSpinnerService.hide();
             if(response[0].status){
                if (response[0].json.json().statusCode == 200) {
                  this.imageDataAfterupload=response[0].json.json().data;                  
                  this.icowizards.crowdsale.tokenImage = this.imageDataAfterupload;
                  this.tokImage=true;
                 }else{
                   this.global_service.showNotification('top','right',"Something went wrong",4,'ti-cross');
                 }
             }
        })      
    }
     reader.readAsDataURL(file)
   }

   teamImage(event){
      this.ng4LoadingSpinnerService.show();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedTeamImage = e.target.result;
      var teamImg=this.selectedTeamImage.split(',')[1]      
      let postData={
        image : teamImg
      }
     const url=this.global_service.basePath + 'merchandise/imageUpload';
            this.global_service.PostRequest(url, postData).subscribe(response => {
               this.ng4LoadingSpinnerService.hide();
             if(response[0].status){
                if (response[0].json.json().statusCode == 200) {
                  var teamImage=response[0].json.json().data;                  
                  this.team.image = teamImage;
                    }else{
                   this.global_service.showNotification('top','right',"SOmething went wrong",4,'ti-cross');
                 }
             }
        })      
    }
     reader.readAsDataURL(file)
   }

 
     whitePaperlistico(event){
       // this.ng4LoadingSpinnerService.show();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedWhitePaperImage = e.target.result;
      console.log()
      var whitePaperImg=this.selectedWhitePaperImage.split(',')[1]      
      let postData={
        image : whitePaperImg
      }
     const url=this.global_service.basePath + 'merchandise/imageUpload';
            this.global_service.PostRequest(url, postData).subscribe(response => {
             // this.ng4LoadingSpinnerService.hide();
             if(response[0].status){
                if (response[0].json.json().statusCode == 200) {
                  var whitepapers=response[0].json.json().data;                  
                  this.icowizards.crowdsale.whitePaper = whitepapers;//this.domSanitizer.bypassSecurityTrustUrl(whitepapers.changingThisBreaksApplicationSecurity);
                  this.whitepaperStatus=true;
                    }else{
                   this.global_service.showNotification('top','right',"Something went wrong",4,'ti-cross');
                 }
             }
        })     
      
  //    this.icowizards.crowdsale.whitePaper = this.domSanitizer.bypassSecurityTrustResourceUrl(this.selectedWhitePaperImage);
    }
     reader.readAsDataURL(file)
   }

    icowizardsDetails(){
     this.icowizards={
                crowdsale: {                              
                               email                : "",
                               tokenImage           : "",
                               tokenName            : "",
                               tokenTicker          : "",
                               contractType         : "white-list-with-cap",
                               contractName         : "MintedTokenCappedCrowdsaleExt",
                               optimized            :  true, 
                               reservedTokens       : [],
                               tokenValue           : "",
                               investorMinCap       : "",  
                               tokenRate            : "",                           
                               tokenSupply          : "",                                 
                               walletAddress        : "",
                               tokenDecimals        : "",
                               crowdsaleAddress     : "",
                               tokenAddress         : "", 
                               pricingStrategy      : [],                               
                               crowdsale            : [],
                               generalInfo          : "",
                               whitePaper           : "", 
                               checkoutItems        : []                          
           },
       }
  }


          

    generateIco(){ 
                  let data={
                               email                : this.company_email.email,
                               tokenImage           : this.icowizards.crowdsale.tokenImage,
                               tokenName            : this.token.name,
                               tokenTicker          : this.token.ticker,
                               contractType         : "white-list-with-cap",
                               contractName         : "MintedTokenCappedCrowdsaleExt",
                               optimized            :  true, 
                               reservedTokens       : this.icowizards.crowdsale.reservedTokens,
                               tokenValue           : this.token.tokenValue,
                               investorMinCap       : this.inversterMinCap.mincap,  
                               tokenRate            : this.token.tokenRate,                           
                               tokenSupply          : this.token.tokenSupply,                                 
                               walletAddress        : this.crowdsale.walletAddress,
                               tokenDecimals        : this.token.tokenDecimals.toString(),
                               crowdsaleAddress     : this.data.crowdsaleAddress,
                               tokenAddress         : this.data.tokenAddress,
                               pricingStrategy      : this.icowizards.crowdsale.pricingStrategy,                               
                               crowdsale            : this.icowizards.crowdsale.crowdsale,
                               generalInfo          : this.generalInfo,
                               whitePaper           : this.icowizards.crowdsale.whitePaper, 
                               startTime            : this.crowdsale.startTime,
                               endTime              : this.crowdsale.endTime,
                               checkoutItems        : this.icowizards.crowdsale.checkoutItems,
                         
               } 
                 const url = this.global_service.basePath + 'users/listICO';
                 this.ng4LoadingSpinnerService.show();                 
                 this.global_service.PostRequest(url,data).subscribe(response=>{
                   console.log(response);
                 this.ng4LoadingSpinnerService.hide();
                  if(response[0].json.json().status==200){  
                   this.ng4LoadingSpinnerService.hide();    
                   localStorage['firstLoad'] = true;
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross'); 
              this.router.navigateByUrl('/home'); 
              // this.boolRoute=true;
              // this.router.navigate(['/home', { 'route_Id': this.boolRoute }]); 
             }else{ 
                   this.ng4LoadingSpinnerService.hide()         
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross'); 
                      this.router.navigateByUrl('/listico');
                    }                   
               });
           }

   pushreservedToken(){
   if(this.reservedTokens.val==="" || this.reservedTokens.val===null){
   this.global_service.showNotification('top','right','please enter Reserved Token Value',4,'ti-cross');
   }
   else if(this.reservedTokens.addr && this.reservedTokens.val){
               
               if(this.reservedTokens.addr[0]!=='0'||this.reservedTokens.addr[1]!=='x'){
                           this.global_service.showNotification('top','right','address should start from 0x',4,'ti-cross');
                           return;
                         }else if(this.reservedTokens.addr.length<42){
                            this.global_service.showNotification('top','right','address length should be 42',4,'ti-cross');
                           return;
                         }
                          else{
                              this.reservedTokenForm=false;
                              this.reservedTokenTabel=true;
                              let data={
                                 val  :this.reservedTokens.val,
                                 addr : this.reservedTokens.addr,
                                 dim : this.reservedTokens.dim
                                        }
           
                                  this.icowizards.crowdsale.reservedTokens.push(data);
                         }


   }
   else if(this.reservedTokens.val!==null){
                this.reservedTokenForm=false;
                this.reservedTokenTabel=true;
                let data={
                   val  :this.reservedTokens.val,
                   addr : this.reservedTokens.addr,
                   dim : this.reservedTokens.dim
               }
               
                   this.icowizards.crowdsale.reservedTokens.push(data);
   }
  }
     
     addMorereservedToken(){
       this.reservedTokens={
                              val : "",
                              addr : ""
                              //dim : ""
                             }
            this.reservedTokenForm=true;
            this.reservedTokenTabel=false;
     }
     popreservedTokens(itemNo1){
       var index = this.icowizards.crowdsale.reservedTokens.findIndex(function(o,index){
          return index === itemNo1;
       })
       if (index !== -1) this.icowizards.crowdsale.reservedTokens.splice(index, 1);
      if(this.icowizards.crowdsale.reservedTokens.length==0){
            this.reservedTokens={
                              val : "",
                              addr : ""
                              //dim : ""
                             }
            this.reservedTokenForm=true;
            this.reservedTokenTabel=false;
         }

    }

    pushteam(){        
      if(!this.team.teamNames){
        this.global_service.showNotification('top','right',"please fill Member Name ",4,'ti-cross');
                return;
           }else if(this.team.teamNames.length<3){
        this.global_service.showNotification('top','right',"Member Name should have atleast three alphabets ",4,'ti-cross');
                return;
           }
           else if(!this.team.designation){
        this.global_service.showNotification('top','right',"please fill Designation ",4,'ti-cross');
                return;
           }else if(this.team.designation.length<3){
        this.global_service.showNotification('top','right',"Designation should have atleast three alphabets",4,'ti-cross');
                return;
           }else if(!this.team.linkedinname){
        this.global_service.showNotification('top','right',"please fill Linkedin name ",4,'ti-cross');
                return;
           }else if(this.team.linkedinname.length<3){
        this.global_service.showNotification('top','right',"linkedin name should have atleast three alphabets",4,'ti-cross');
                return;
           }
                 
              this.teamForm=false;
              this.teamTabel=true;
               if(this.team){
                                  
                                  let data={
                                             name  :this.team.teamNames,
                                             designation : this.team.designation,
                                             linkedinname  :this.team.linkedinname,
                                             image : this.team.image
                                           }
                                           
                                 this.generalInfo.team.push(data);
                                
                                }else{
                                     // this.teamselect=true;
               }
            }

     popteam(itemNo1){
        var index = this.generalInfo.team.findIndex(function(o,index){
          return index === itemNo1;
       })
       if (index !== -1){
         this.generalInfo.team.splice(index, 1);
         if(this.generalInfo.team.length==0){
            this.team={
                image         : "",
                teamNames      : "",
                linkedinname  : "",
                designation   : ""
              }
            this.teamForm=true;
         this.teamTabel=false; 
         }
       } 
    }
    addMoreteamteam(){
       this.team={
                image         : "",
                teamNames      : "",
                linkedinname  : "",
                designation   : ""
              }
         this.teamForm=true;
         this.teamTabel=false;
    }
    addMoreroadmap(){
       this.milestone= {
                     milestone1 : "",
                     milestonedate : ""
                    };
      this.milestoneForm=true;
       this.milestoneTabel=false;
    }

     pushroadmap(){
       
       if(!this.milestone.milestone1 ){
           this.global_service.showNotification('top','right',"please fill Milestones",4,'ti-cross');
                return;
       } if(this.milestone.milestonedate==""){
           this.global_service.showNotification('top','right',"please fill date befor save",4,'ti-cross');
                return;
       }
       this.milestoneForm=false;
       this.milestoneTabel=true;
       // alert("this.milestone.milestonedate = = "+this.milestone.milestonedate);
       this.milestone.milestonedate= moment(this.milestone.milestonedate).format('YYYY-MM-DD');
        if(this.milestone){
           
          let data={
             milestone1  :this.milestone.milestone1,
             milestonedate : this.milestone.milestonedate
       }
       this.generalInfo.milestone.push(data);     
        }else{
        // this.milesto=true;
        }
    }

    popmilestone(itemNo1){
       var index = this.generalInfo.milestone.findIndex(function(o,index){
          return index === itemNo1;
       })
       if (index !== -1) {
         this.generalInfo.milestone.splice(index, 1);
            if(this.generalInfo.milestone.length==0){
            this.milestone={
                     milestone1 : "",
                     milestonedate : ""
                    };
             this.milestoneForm=true;
       this.milestoneTabel=false; 
         }
       }
    }

 

      home(){
             window.location.href='https://www.kryptual.com/';
      }


      contactFormInit(){
      this.contactForm = this.fb.group({
            'name': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([a-zA-Z]{1,30})$/)])),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
            'message': new FormControl('', Validators.required),
            'subject': new FormControl('', Validators.required)

        });
    }
    subscribeFormInit(){
      this.subscribeForm = this.fb.group({
            'email': new  FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
        });
    }
    sendMessage(){
    
         const url = this.global_service.basePath + 'api/contactUs';
         this.global_service.PostRequestUnautorized(url , this.contactDetail)
         .subscribe((response) => {
          if(response[0].json.status==200){
                this.contactForm.reset();
              this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');   
             }else{
              this.contactForm.reset();
               this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
        })
     }
     subscribe(){
       const url = this.global_service.basePath + 'api/subscribeUs';
         this.global_service.PostRequestUnautorized(url , this.subscribeDetail)
         .subscribe((response) => {
          if(response[0].json.status==200){
              this.subscribeForm.reset();
               this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');   

             }else{
               this.subscribeForm.reset();
                this.contactForm.reset();
                 this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
        })
     }


      addressValidate(add:any){

        let postData={
                     address:add,
        }
        const url = this.global_service.basePath + 'api/validateAddress';
            this.global_service.PostRequest(url, postData).subscribe(response => {
              let res=response;
              if(res[0].status==200){
                if(res[0].json.json().status==400){
                  this.global_service.showNotification('top','right',res[0].json.json().message,4,'ti-cross');
                }
              }
            });
      }

        listIcoForm(){
           this.registerForm = this.fb.group({
             'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
             'name': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^[a-zA-Z0-9]{1,28}$/)])),
             'ticker': new FormControl('',Validators.compose([Validators.required ,Validators.maxLength(3), Validators.pattern(/^[a-zA-Z0-9]{1,3}$/)])),
             'companyName': new FormControl('',Validators.required),
             'description': new FormControl('',Validators.required),
             'tokenValue': new FormControl('',Validators.compose([Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,15})?\s*$/)])),
             'tokenSupply': new FormControl(),
             'walletAddress': new FormControl(),
             'tokenDecimals': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^([1-9]|1[0-8])(?:\.\d{1,18})?$/)])),
             'crowdsaleAddress': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^0x[a-fA-F0-9]{40}$/)])),
             'tokenAddress': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^0x[a-fA-F0-9]{40}$/)])),
             'twitter': new FormControl('',Validators.compose([Validators.pattern(/(?:https:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/)])),
             'facebook': new FormControl('',Validators.compose([Validators.pattern(/(?:https:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/)])),
             'linkedin': new FormControl('',Validators.compose([Validators.pattern(/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/)])),
             'website': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),
             'vedio': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),     
             'teamnames': new FormControl('',Validators.compose([Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]{3,}$/)])),
             'linkedinname': new FormControl('',Validators.compose([Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]{3,}$/)])),
             'designation': new FormControl('',Validators.compose([Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]{3,}$/)])),
             'milestone1': new FormControl(), 
             'milestonedate': new FormControl(),      
             'addr': new FormControl('',Validators.compose([Validators.pattern(/^0x[a-fA-F0-9]{40}$/)])),  
             'val': new FormControl('',Validators.compose([ Validators.pattern(/^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|[1-8][0-9]{6}|9[0-8][0-9]{5}|99[0-8][0-9]{4}|999[0-8][0-9]{3}|9999[0-8][0-9]{2}|99999[0-8][0-9]|999999[0-9]|[1-8][0-9]{7}|9[0-8][0-9]{6}|99[0-8][0-9]{5}|999[0-8][0-9]{4}|9999[0-8][0-9]{3}|99999[0-8][0-9]{2}|999999[0-8][0-9]|9999999[0-9]|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|1000000000)$/)])),
             'tier': new FormControl('',Validators.required),          
             'supply': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|[1-8][0-9]{6}|9[0-8][0-9]{5}|99[0-8][0-9]{4}|999[0-8][0-9]{3}|9999[0-8][0-9]{2}|99999[0-8][0-9]|999999[0-9]|[1-8][0-9]{7}|9[0-8][0-9]{6}|99[0-8][0-9]{5}|999[0-8][0-9]{4}|9999[0-8][0-9]{3}|99999[0-8][0-9]{2}|999999[0-8][0-9]|9999999[0-9]|[1-8][0-9]{8}|9[0-8][0-9]{7}|99[0-8][0-9]{6}|999[0-8][0-9]{5}|9999[0-8][0-9]{4}|99999[0-8][0-9]{3}|999999[0-8][0-9]{2}|9999999[0-8][0-9]|99999999[0-9]|1000000000)$/)])),
             'rate': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|100000)$/)])),
             'startTime': new FormControl('',Validators.required),
             'endTime': new FormControl('',Validators.required),
             'mincap': new FormControl('',Validators.compose([Validators.required , Validators.pattern(/^([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1000)(?:\.\d{1,18})?$/)])) 
        });
    }

              minus(e){           
                      if (e.keyCode === 189 ) {
                          return false;
                      }
                  }

     ngAfterViewInit() {
       window.scrollTo(0, 0);
   }

}