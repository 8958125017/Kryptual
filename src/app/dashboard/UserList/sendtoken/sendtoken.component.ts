  import { Component, OnInit,NgModule,Injectable } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import { GlobalService } from './../../../GlobalService';
  declare const $: any;
  @Component({
    selector: 'app-sendtoken',
    templateUrl: './sendtoken.component.html',
    styleUrls: ['./sendtoken.component.scss']
  })
  export class SendtokenComponent implements OnInit {
      user: any;
      sendTokenDetail:SendTokenDetail;
      transactionHistory:any;
      tokenList:any[]=[];
      ethBalance:any="0";
      sendTokenForm: FormGroup;
      passwordForm: FormGroup;
      tokenBalance:any;
      crowdsaleAddress:any;
      noTokenFound:boolean=false;
      constructor(
                  private http: Http,
                  private route: ActivatedRoute,
                  private router: Router,
                  private fb: FormBuilder,
                  private global_service:GlobalService,
                  private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
  	             )
                  {

                    var status = this.global_service.isLogedIn();
                    if(status==false){
                     this.router.navigateByUrl('/login');
                    }
                    this.user=JSON.parse(localStorage.getItem('currentUser'));
                    if(this.user!=null||this.user!=undefined)
                        {
                              this.getBalance();
                             // this.getTokens();
                              this.getsendTokens();
                              this.getTransactionHistory();
                       }
                       this.tokenDetails();
                  }

                  // get eth balance

                  getBalance(){
                               let postData ={
                               userId : this.user._id,
                               address:this.user.EthAddress
                             };
                             const url = this.global_service.basePath + 'ETH/getBalanceByAddress';
                             this.global_service.PostRequest(url , postData).subscribe(response=>{
                               if(response[0].json.status==200)
                               {
                                 this.ethBalance=response[0].json.json().data;
                                 this.ethBalance = this.ethBalance.toFixed(5);
                               }else
                               {
                                this.ethBalance="NA";
                               }
                             })
                   }

                  // get token details

                     getTokens(){
                                let postData ={
                                    userId : this.user._id,
                                    Address: this.user.EthAddress
                                };
                               const url = this.global_service.basePath + 'ETH/getAllsendTokens';
                               this.global_service.PostRequest(url , postData).subscribe(response=>{
                                this.noTokenFound=false;
                               if(response[0].status == 200)
                                {
                                  var tokenDetails=response[0].json.json().data;
                                  if(tokenDetails.length!=0)
                                    {
                                      for(var data of tokenDetails.tokens)
                                      {
                                       var balance = (data.balance/(Math.pow(10,data.tokenInfo.decimals)))
                                       data.tokenBalance = balance;
                                       this.tokenList.push(data);
                                      }

                                    }
                                  else
                                  {
                                    this.noTokenFound=true;                                    
                                  }
                              }
                              
                            })
                     }
                   
                   getsendTokens(){
                         let postData ={
                                    userId : this.user._id,
                                    address: this.user.EthAddress
                                };
                               const url = this.global_service.basePath + 'api/getSendTokensByEthAddress';
                               this.global_service.PostRequest(url , postData).subscribe(response=>{
                               this.noTokenFound=false;
                               if(response[0].status == 200)
                                {
                                  var tokenDetails=response[0].json.json().data;                                
                                  if(tokenDetails.length!=0)
                                    {
                                      for(var data of tokenDetails)
                                      {
                                       //var balance = (data.balance/(Math.pow(10,data.tokenInfo.decimals)))
                                      // data.tokenBalance = balance;
                                       this.tokenList.push(data);                                       
                                      }

                                    }
                                  else
                                  {
                                    this.noTokenFound=true;                                    
                                  }
                              }
                              
                            })
                   }

                    // Get get Contract Address By Token

                    getContractAddressByToken(tokenAddress:any){                      
                      this.sendTokenForm.reset();
                      this.passwordForm.reset();
                      let postData ={
                                    userId : this.user._id,
                                    tokenAddress: tokenAddress
                       };
                       const url = this.global_service.basePath + 'ETH/getContractAddressByToken';
                       this.ng4LoadingSpinnerService.show();
                       this.global_service.PostRequest(url , postData).subscribe(response=>{
                       if(response[0].status == 200 )
                       {
                          this.ng4LoadingSpinnerService.hide();
                          //   if(response[0].json.json().data.length!=0){
                          //   this.crowdsaleAddress=response[0].json.json().data.crowdsaleAddress;
                          // }
                          this.crowdsaleAddress=tokenAddress;// change in live
                        }
                        });
                    }

                    checkAddress(){                                                              
                         if(this.sendTokenDetail.toAddress[0]!=='0'||this.sendTokenDetail.toAddress[1]!=='x'){
                        this.global_service.showNotification('top','right','address should start from 0x',4,'ti-cross');
                         return;
                       }else if(this.sendTokenDetail.toAddress.length<42){
                         this.global_service.showNotification('top','right','address length should be 42',4,'ti-cross');
                         return;
                           }
                         if(this.crowdsaleAddress){
                           $('#noticeModa1232').modal('show');
                         }else{
                            this.global_service.showNotification('top','right','please select token first',3,'ti-cross');
                         }
                       }

                  // get transaction history
                    getTransactionHistory(){

                    }


                   tokenDetails() {
                         this.sendTokenDetail = {
                           fromAddress: "",
                           amount: "",
                           toAddress: "",
                           userId: "",
                           password:''
                       }
                     }



                  // send token

                   sendTokens() {
                      $('#noticeModa1232').modal('hide');
                     this.ng4LoadingSpinnerService.show();
                     let postData = {
                         userId : this.user._id,                         
                         tokenContractAddress:this.crowdsaleAddress,
                         fromAddress: this.user.EthAddress,
                         toAddress:this.sendTokenDetail.toAddress,
                         amount: this.sendTokenDetail.amount.toString(),
                         password:this.sendTokenDetail.password
                     };

                     const url = this.global_service.basePath + 'ETH/sendTokenToUser';
                     this.global_service.PostRequest(url, postData).subscribe(response => {
                         if (response[0].json.status == 200) {
                           this.ng4LoadingSpinnerService.hide();
                             this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                             this.sendTokenForm.reset();
                             this.passwordForm.reset();
                            
                             this.getTokens();
                             this.getTransactionHistory();
                            } else
                           {
                             this.ng4LoadingSpinnerService.hide();
                             this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                             this.sendTokenForm.reset();
                             this.passwordForm.reset();
                           }
                     })
                 }
                 enteronsend(event){
                   if(event.keyCode === 13){
                                      this.sendTokens();
                                     }
                 }

                 withdrawFormInit() {
                     this.sendTokenForm = this.fb.group({
                         'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^(?:[1-9][0-9]{0,20}(?:\.\d{1,2})?|100000000000000000000|100000.00)$/)])),
                         'toAddress': new FormControl('', Validators.compose([Validators.required,Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]))
                     });
                 }
                 eventHandler(e) {
                  this.enteronsubmit(e);
                  if(!((e.keyCode > 95 && e.keyCode < 106)
                    || (e.keyCode > 45 && e.keyCode < 58)
                    || e.keyCode == 8)) {
                      return false;
                  }
                  }
                  enteronsubmit(event){                    
                    if(this.sendTokenDetail.toAddress&&this.sendTokenDetail.amount){
                                  if(event.keyCode === 13){
                                      this.checkAddress();
                                     } 

                                   }
                                            
                           }

                 passwordFormInit() {
                     this.passwordForm = this.fb.group({
                         'password':  new FormControl('', Validators.required)
                     });
                 }

                 ngOnInit() {
  	               this.withdrawFormInit();
  	               this.passwordFormInit();
                 }

  }
