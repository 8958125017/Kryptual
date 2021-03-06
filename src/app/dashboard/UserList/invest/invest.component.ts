 import { Component, OnInit,NgModule,Injectable } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import { GlobalService } from '../../../GlobalService';
  import * as moment from 'moment';
  import  * as CONST from '../../../ico_constant';
 import  * as ico   from'./../../../ico_constant';
  declare const paypal: any;
declare const $: any;
@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss']
})

export class InvestComponent implements OnInit {
  useraddress:any;
  tokenAddress:any;
  investData : any;
  description:any;
  tokenData:any;
  user :any;
  tokenEndAt : any;
  enddate : any;
  tokenBalance :any;
  ethBalance : any;
  buyToken : any;
  password : any;
  calculatedEth : number = 0;
  enablePaypal : boolean = false;
  dollerAmount : number = 0 ;
  ethrate : string = '';
  holderCount:any;
  crowdSaleAddress:any;
  socialUrl:any;
  buyingToken:any= {
                      amount:""
                   }
  passwordDetails:any={
                       password:""
                      }
  investForm:FormGroup;
  passwordForm:FormGroup;
  facebookLink:any;
  linkedinLink:any;
  twitterLink:any;
  constructor(
  	private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService

  	) {
      var status = this.global_service.isLogedIn();
      if(status==false){
       this.router.navigateByUrl('/login');
      }

        this.getEthereumFromUSD();
        this.user=JSON.parse(localStorage.getItem('currentUser'));
        this.activatedRoute.params.subscribe(params => {
            this.tokenAddress = params["id"];
        });
        this.getBalance();
        this.getTokenInfo();
        this.getHolderCount();
        this.socialUrl="http://52.66.185.83/#/homecrowdsale;id="+this.tokenAddress ;
      }

  ngOnInit() {
  	 this.investerForm();
     this.passwordforms();
  }
  
  investerForm(){
    this.investForm = this.fb.group({
          'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^.?(0|[0-9]\d*)(\.\d+)?$/)])),
        });
  }
  passwordforms(){
     this.passwordForm = this.fb.group({
          'password':  new FormControl('', Validators.required)
        });
  }
   eventHandler(e) {
     if(e.keyCode === 13){
      this.invest_tokenPassword(this.investData.tokenName,this.buyingToken.amount);
     }
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 45 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
      }
    }

  enteronsubmit(event){
     if(event.keyCode === 13){
       this.investInToken(this.investData.tokenName);
     }        
   }
   fundStatus:boolean=false;
  enterTokenValue(event:any){
    if(event.target.value > this.investData.tokenSupply){
      this.fundStatus = false;
      this.global_service.showNotification('top','right',"You can't buy "+event.target.value+" tokens!.",4,'ti-cross');
      return false;
    }

    if(!this.enablePaypal){
      this.calculatedEth = this.getETHERUM();
      if(this.calculatedEth > this.ethBalance){  
      this.fundStatus=true;     
        this.global_service.showNotification('top','right','Insufficient fund to buy tokens',4,'ti-cross');
         event.preventDefault();
        return false;
      }else{
         this.fundStatus=false; 
      }
    }else{
      this.calculatedEth = this.getDoller();
    }

  }

  getETHERUM(){

    let value =(this.buyingToken.amount / this.investData.tokenRate);
    return value;
  }

  getDoller(){
    let currentVal = parseFloat(this.ethrate);
    let value = ((this.buyingToken.amount/ this.investData.tokenRate) * currentVal);
    return value;
  }

  getTokenInfo(){
    let postData = {
      tokenId : this.tokenAddress,
      userId : this.user._id,
    };
          const url = this.global_service.basePath + 'ETH/getTokenInfoByTokenId';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
            
             let res = response[0].json.json();
            if(res.status==200){
                this.investData=res.data;
                this.tokenData=res.data;
                 if(!this.tokenData.tokenImage){
                  this.tokenData.tokenImage="./assets/img/No-preview.png";
                 }
                 if(this.tokenData.generalInfo.description){
                  this.description=this.tokenData.generalInfo.description;
                  }else{
                   this.description="--";
                 }
                 if(this.tokenData.generalInfo.facebook){
                  this.facebookLink=this.tokenData.generalInfo.facebook;
                 }else{
                 this.facebookLink="https://www.facebook.com";
                 }
               
               if(this.tokenData.generalInfo.linkedin){
                 this.linkedinLink=this.tokenData.generalInfo.linkedin;
                }else{
                this.linkedinLink="https://www.linkedin.com";
               }
              if(this.tokenData.generalInfo.twitter){
                this.twitterLink=this.tokenData.generalInfo.twitter;
              }else{
                this.twitterLink="https://www.twitter.com";
              }
                this.crowdSaleAddress=this.investData.crowdsaleAddress
                //this.enddate=moment(res.data.endTime).format('LL');
                this.investData.endDate=res.data.endTime;
                //this.investData.endDate = this.enddate;
                this.counterDemo(this.investData.endDate);
                this.getTokenBalanceForInvest(this.investData.tokenAddress,res.data.crowdsaleAddress);
            }
          });

      }
     x:any;
     counterDemo(endTime:any){             
      this.x = setInterval(function() {
       this.countDownDateExample=new Date(endTime).getTime();     
        var now = new Date().getTime();        
        // Find the distance between now an the count down date
        var distance = this.countDownDateExample - now;      
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
       // Output the result in an element with id="demo"
            var element = document.getElementById("demo9");
              if(element){         
                 document.getElementById("demo9").innerHTML = days + "d " + hours + "h "
              + minutes  + "m " + seconds + "s";
              }
        // If the count down is over, write some text        
        if (distance < 0) {          
            clearInterval(this.x);
            var element = document.getElementById("demo9");
            if(element){
                   document.getElementById("demo9").innerHTML = "Time Out";
            }
          }
        }, 1000);
      }  
      
  getTokenBalanceForInvest(tokenAddress:any,crowdsaleAddress : any) :any{
    let postData = {
      crowdSaleAddress :crowdsaleAddress,
      userId : this.user._id,
      userEthAddres : this.user.EthAddress,
      tokenAddress : tokenAddress
    };
   
    const url = this.global_service.basePath + 'api/getTokenBalanceForInvest';
     this.global_service.PostRequest(url,postData).subscribe(response=>{
       let res = response[0].json.json();
      if(res.status==200){
          this.tokenBalance=res.tokenBalance;
      }else{
              
      }
    });
  }
  

  // method for payment type
  handleChange(evt,type) {
      var target = evt.target;

      if(type==1)  {
        this.calculatedEth = this.getETHERUM();
         this.enablePaypal = false;         
      }else if(type==2){

        this.calculatedEth = this.getDoller();
        if(this.calculatedEth > CONST.minDoller){
          // all thing calculated for doller by payment
          this.enablePaypal = true;
          this.gotoPaypalPayment();
        }else{
          this.global_service.showNotification('top','right','Buy token',4,'ti-cross');
        }

      }
    }


  invest_tokenPassword(tokenName:any,amount:any){
   this.global_service.emitEvent("Token Invest page ", "Input",'Invest button' +" "+ "TokenName"+" "+ tokenName + " Amount" +" "+  amount); 
   if(this.buyingToken.amount==0){
      this.global_service.showNotification('top','right',"You can't buy 0 token.",4,'ti-cross');
   return;
   }
   $('#noticeModalinvest').modal('show');
 }
  

  investInToken(tokename:any){
    this.ng4LoadingSpinnerService.show();
      if(this.calculatedEth && this.buyingToken.amount){        
        this.gotoEthPayment();
         this.deductAmount(); 
        this.calculatedEth=0;
        this.investForm.reset();
        this.passwordForm.reset();
        $('#noticeModalinvest').modal('hide');
      }else{
        this.global_service.showNotification('top','right','Please buy token first!.',4,'ti-cross');
        this.passwordDetails.password ='';
      }

  }

  gotoEthPayment(){  
       let postData ={
                      fromAddress:this.user.EthAddress,
                      crowdsaleAddress:this.crowdSaleAddress,
                      userId : this.user._id,                     
                      amount: (this.calculatedEth).toString(),
                      password : this.passwordDetails.password,
                      quantity : this.buyingToken.amount
        };
      
        const url = this.global_service.basePath + 'ETH/buyTokenToUser';
        this.global_service.PostRequest(url , postData).subscribe(response=>{   
            if(response[0].json.json().status==200)
              {
                this.ng4LoadingSpinnerService.hide();
               this.passwordDetails={};            
               this.global_service.showNotification('top','right','You have bought '+postData.quantity+" tokens!.",2,'ti-cross');
                 
              }
               else
              {
                 this.ng4LoadingSpinnerService.hide();
                this.passwordDetails={};
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
              }
        })
  }

  deductAmount(){  
    let investAmount = (this.calculatedEth)/100;
       let postData ={
                      fromAddress:this.user.EthAddress,
                      toAddress: ico.companyETHaddress,
                      userId : this.user._id,
                      amount: investAmount.toString(),
                     password : this.passwordDetails.password
        };       
        const url = this.global_service.basePath + 'ETH/WithdrawEth';
        this.global_service.PostRequest(url , postData).subscribe(response=>{
          
            if(response[0].json.json().status==200)
              {
               this.getBalance();
               //this.buyingToken.amount = '';
               // this.global_service.showNotification('top','right','You have bought '+this.buyToken+" tokens!.",2,'ti-cross');
              }
               else
              {
               this.ng4LoadingSpinnerService.hide();
               this.buyingToken.amount = '';
              // this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
              
              }
        })
  }

  getBalance(){    
       let postData ={
         userId : this.user._id,
         address:this.user.EthAddress
       };
        const url = this.global_service.basePath + 'ETH/getBalanceByAddress';
        this.global_service.PostRequest(url , postData).subscribe(response=>{
        if(response[0].json.status==200){
        this.ethBalance=response[0].json.json().data;
        this.ethBalance = this.ethBalance.toFixed(5);
        }else{
         this.ethBalance="NA";
        }
      })
  }




  loadExternalScript(scriptUrl: string) {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
      });
  }

   getEthereumFromUSD(){
           const url = this.global_service.basePath + 'api/getEthereumFromUSD';
           this.global_service.GetRequest(url).subscribe(response=>{
            if(response[0].status==200){
                this.ethrate=response[0].json.data.last;
            }else{
             this.ethrate= '';
            }
          })
    }

  gotoPaypalPayment(){
     let self = this;
        this.loadExternalScript(CONST.paypalButtonLoader).then(() => {
          paypal.Button.render({
            env: CONST.paypalEnv,
            client: {
              production: '',
              sandbox: CONST.paypalSandboxKey
            },
            commit: true,
            payment: function (data, actions) {
              return actions.payment.create({
                payment: {
                  transactions: [
                    {
                      amount: { total: '10', currency: 'USD' }
                    }
                  ]
                }
              })
            },
            onAuthorize: function(data, actions) {
              return actions.payment.execute().then(function(payment) {
               
                if(payment.state =='approved' && payment.payer.status=="VERIFIED"){

                    let amount = (10 * payment.transactions[0].amount.total);
                     let postData ={
                                    fromAddress:CONST.companyETHaddress,
                                    toAddress:self.user.EthAddress,
                                    userId : self.user._id,
                                    amount:amount,
                                    password : ''
                                   };
                      const url = self.global_service.basePath + 'ETH/withdrawEth';
                      self.global_service.PostRequest(url , postData).subscribe(response=>{
                            if(response[0].json.json().status==200)
                              {
                              
                               self.getBalance();
                               self.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                              }
                               else
                              {
                              // self.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                              }
                      })
  
                }
                else{
                  //self.global_service.showNotification('top','right','Payment Failed!.',4,'ti-cross');
                }

              })
            }
          }, '#paypal-button');
        });
  }


    fbLInk(){
       this.global_service.emitEvent("Token Invest page", "Click", this.facebookLink, 1);
    }
     linkLInk(){
       this.global_service.emitEvent("Token Invest page", "Click", this.linkedinLink, 1);
    }
     twittLInk(){
       this.global_service.emitEvent("Token Invest page", "Click", this.twitterLink, 1);
    }
  



  getHolderCount(){
    let data = {
      tokenAddress : this.tokenAddress
    }
     const url = this.global_service.basePath + 'api/getTokenInfo';
        this.global_service.PostRequest(url , data).subscribe(response=>{
          
        if(response[0].json.status==200){
          this.holderCount = response[0].json.json().holdersCount; 
        }else{

        }

  })
}

}
