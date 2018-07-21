  import { Component, OnInit,NgModule,Injectable,AfterViewInit } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import * as moment from 'moment';
  import { GlobalService } from './../../../GlobalService';
  import { TableData } from './../../../md/md-table/md-table.component';
  
  declare const $: any;
  declare const paypal: any;
   import  * as ico   from'./../../../ico_constant';
import { Observable } from 'rxjs/Rx';
  declare interface DataTable {
   dataRows?: string[][];
  }



  @Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
  })

  export class ViewUserComponent implements OnInit,AfterViewInit{
    public dataTable: DataTable;
    public dataTable2: DataTable;
    public tableData: TableData;
    public tableData2: TableData;

    transData: Transdata;
    updateDetails:TokenDetails;
    withdrawDetails: WithdrawDetail;
    withDrawForm: FormGroup;
    updateTokenForm: FormGroup;
    user: any;
    tokenList:any;
    tokenDetail:any;
    transactionData:any[]=[];
    tokenBalanceList:any[]=[];
    incompleteICO : any[]=[];
    upcommingToken:any[]=[];
    ethBalance:any;
    submitted: boolean;
    accountType:boolean;
    currentToken:any[]=[];
    completedToken:any[]=[];
    currentDate:any;
    currentDate1:any;
    ethAddress:any;
    enddate:any;
    endTime:any;
    lastDate:any;
    time: any = "March 3, 2018";
 
    ethrate:any;
    editToken_Id:any;
    depositDialog: boolean = false;
    withdrawDialog: boolean = false;
    complete:boolean=false;
    teamInfo:any=false;
    inputDescr:boolean=false;
    inputLinkedName:boolean=false;
    save:boolean=false;
    remove:boolean=true;
    editTokenInfo:boolean=false;
    noImageForCompleteToken :boolean=false;
    noImageForcurrentToken:boolean=false;
    selectedTeamImage : any;
    tabeldata:boolean=true;
    tabeldata2:boolean=true;
    depositEth:any;
    mymodel:any;
    ongoing:boolean=true;
    banner:boolean=false;
    incomplete:boolean = false;
    paypalStatus:boolean=true;
    selectedWhitePaperImage:any;
    deleteTokenStatus:boolean=false;   
    seemoreOngoing:boolean=false;
    seemoreUpcomming:boolean=false;
    seemoreExpired:boolean=false;
    seemoreIncomplete:boolean=false;
    extra:any=6;
    incompletesix:any=6;
    ongoingsix:any=6;
    upcommingsix:any=6;
    completesix:any=6;
    deleteTokenid:any;
    whitepaperStatus:boolean=false;
    teamStatus:boolean=false;
    totalTokenSupply : number = 0;     
    allparam:any;
    enablePaypal :boolean =  true;

   // paypalButtonStatus:boolean=true;
    text:any = {
                Year: 'Year',
                Month: 'Month',
                Weeks: "Weeks",
                Days: "Days",
                Hours: "Hours",
                Minutes: "Minutes",
                Seconds: "Seconds",
                MilliSeconds: "MilliSeconds",
    };
    noToken:boolean=false;
    completeTokenStatus:boolean=false
    ongoingTokenStatus:boolean=false;
    incompleteTokenStatus:boolean=false;
    upcommingTokenStatus:boolean;
    upcommings:boolean=false;
    //private eventDate: Date = new Date(2018, 3, 3);

    private diff: number;
    private countDownResult: number;
    private days: number;
    private hours: number;
    private minutes: number;
    private seconds: number;
    public difference:any;
    // constructor start
    constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,              
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
               )
               {

                var status = this.global_service.isLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
                   this.user=JSON.parse(localStorage.getItem('currentUser'));
                   this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
                   this.currentDate1 = moment(new Date()).format('LL');
                   if(this.user!=null||this.user!=undefined)
                   {
                     if(this.user.accountType == "Investor")
                     {
                       this.accountType=false;
                     }else
                     {
                       this.accountType=true;
                        //this.getTokenByUserId();
                    }
                   this.ethAddress=this.user.EthAddress;
                   this.getEthereumFromUSD();
                   this.getBalance();
                   //2ndtable
                   //this.getTransactionsByAccount();
                   //2ndtable
                   this.getTransactionsByAccountRopsten();
                   this.getToken("ongoing");
                   // this.getTokenBalanceByAddress();
                  }
                   this.tokenInfo();
                   this.withdrawDetail();
                   this.transDataDetail();
                   this.loadPaypalButton();
                   // for left side token balance
                  //this.getTokenBalanceAndName();
                  // for left side token balance
                  this.getTokenBalanceAndNameRopsten();
                  this.tabelJquery();
              
               }

                tabelJquery(){
                    $(document).ready( function () {
                      $('#table_id007').DataTable({
                         'pagingType': 'full_numbers',
                         'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                         responsive: true,
                         language: {
                         search: '_INPUT_',
                         searchPlaceholder: 'Search..',
                        }
                      });
                     });

                     $(document).ready( function () {
                      $('#table_id7777').DataTable({
                         'pagingType': 'full_numbers',
                         'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                         responsive: true,
                         language: {
                         search: '_INPUT_',
                         searchPlaceholder: 'Search..',
                        }
                      });
                     });
            }

     

            valuechange(e : any){
              this.enablePaypal = true;
               if (e.keyCode === 189 ) {
                          return false;
                      }
                 else if(e.target.value && this.ethrate){
                 this.depositEth = (e.target.value / this.ethrate);
               }    else{
                 this.depositEth=0
               }
            }
             minus(e){
               
                 //      if (e.keyCode === 190 ) {
                 //          return false;
                 //      }
                      if (e.keyCode === 189 ) {
                          return false;
                      }
                  }


             getEthereumFromUSD(){  
             this.ethrate="";                             
                   const url = this.global_service.basePath + 'api/getEthereumFromUSD';
                   this.global_service.GetRequest(url).subscribe(response=>{
                    if(response[0].status==200){
                        this.ethrate=response[0].json.data.last;
                    }else{
                     this.ethrate="NA";
                    }
                  })
            }

            editTokenToGenerateIco(tokenid:any){ 
                localStorage.setItem('editToken', tokenid); 
                this.router.navigate(['/dashboard/generateIco']);
            }


      loadPaypalButton()  {
        let self = this;
        this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
          paypal.Button.render({
            env: 'sandbox',
            client: {
              production: '',
              sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
            },
            commit: true,
            payment: function (data, actions) {
              return actions.payment.create({
                payment: {
                  transactions: [
                    {
                      amount: { total: self.mymodel, currency: 'USD' }
                    }
                  ]
                }
              })
            },
             onAuthorize: function(data, actions) {
              return actions.payment.execute().then(function(payment) {
                
                if(payment.state =='approved' && payment.payer.status=="VERIFIED"){

                    // let amount = (10 * payment.transactions[0].amount.total);
                     let postData = {
                                      userId : self.user._id,
                                      toAddress: self.user.EthAddress,
                                      fromAddress: ico.companyETHaddress,
                                      amount: self.depositEth.toString(),
                                      password:ico.companyPassword
                                    };
                                
                      const url = self.global_service.basePath + 'ETH/sendEthToUser';
                      self.global_service.PostRequest(url , postData).subscribe(response=>{
                            if(response[0].json.json().status==200)
                              {
                           
                               self.getBalance();
                               self.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                              }
                               else
                              {
                               self.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                              }
                      })
                   // let amount = (this.ethrate*payment.transactions[0].amount.total);
                   // this.giveETHtoUserByUSD(payment);
                }
                else{
                  self.global_service.showNotification('top','right','Payment Failed!.',4,'ti-cross');
                }

              })
            }
          }, '#paypal-button');
        });
      }

      loadExternalScript(scriptUrl: string) {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
        });
      }

      withdrawDetail() {
          this.withdrawDetails = {
            fromAddress: "",
            amount: "",
            toAddress: "",
            userId: "",
            password:''
        }
      }

      transDataDetail(){
         this.transData ={
              sn:"",
              hash:"",
              value:""
         }
       }

      Ongoing(){  
      $('#loader1').show();     
         this.global_service.emitEvent("Dashbard Page", "Click", "Ongoing Tab", 1);
         this.currentToken =[];
         this.ongoing = true;
         this.complete = false;
         this.incomplete = false;
         this.upcommings=false;        
         this.ongoingTokenStatus=false;            
         this.seemoreIncomplete=false;
         this.seemoreUpcomming=false;
         this.seemoreExpired=false;
         this.seemoreOngoing=false;         
         this.getToken("ongoing");
      }

      Completed(){  
      $('#loader3').show();     
        this.global_service.emitEvent("Dashbard Page", "Click", "Completed Tab", 1);
        this.completedToken =[];
        this.ongoing = false;
        this.complete=true;
        this.incomplete = false;
        this.upcommings=false;        
        this.completeTokenStatus=false;
        this.seemoreIncomplete=false;
        this.seemoreUpcomming=false;
        this.seemoreExpired=false;
        this.seemoreOngoing=false;
        this.getToken("expire");

     }
     upcomming(){ 
     $('#loader2').show();       
       this.global_service.emitEvent("Dashbard Page", "Click", "Upcomming Tab", 1);
        this.upcommingToken =[];
        this.upcommings=true;
        this.ongoing = false;
        this.complete=false;
        this.incomplete = false;        
        this.upcommingTokenStatus=false;
        this.seemoreIncomplete=false;
        this.seemoreUpcomming=false;
        this.seemoreExpired=false;
        this.seemoreOngoing=false;
        this.getToken("upcomming");

     }

     InCompleted(){ 
     $('#loader4').show();       
       this.global_service.emitEvent("Dashbard Page", "Click", "Incompleted Tab", 1);
       this.incompleteICO=[];
       this.ongoing = false;
       this.upcommings=false;
       this.complete = false;
       this.incomplete = true;
       this.completeTokenStatus=false;
       this.ongoingTokenStatus=false;
       this.incompleteTokenStatus=false; 
       this.seemoreIncomplete=false;
       this.seemoreUpcomming=false;
       this.seemoreExpired=false;
       this.seemoreOngoing=false;   
       this.getIncompleteICO();
     }
seeMore(){
  if(this.incomplete){
     $('#loader4').show(); 
   this.incompletesix+=this.extra;
    this.getIncompleteICO();
  }
  if(this.ongoing){
    $('#loader1').show();
   this.ongoingsix+=this.extra;
    this.getToken("ongoing");
  }
  if(this.upcommings){
    $('#loader2').show();
   this.upcommingsix+=this.extra;
    this.getToken("upcomming");
  }
  if(this.complete){
    $('#loader3').show();
   this.completesix+=this.extra;
    this.getToken("expire");
  }
  
}
// makeCrowedSaleFinal
makeCrowedSaleFinal(data:any){ 
      let postData = {
                    fromAddress: this.user.EthAddress,
                    crowdsaleAddress:data,
                    userId: this.user._id
                };
      const url = this.global_service.basePath + 'ETH/makeCrowdsaleFinal';
      this.global_service.PostRequest(url, postData).subscribe(response=>{
                 
       });
    }

    //......................................................................
    tokenData:any[]=[];
    x:any;
    j:any=0;


     cadd:any;
     getToken(value:any){        
       let postData ={
          userId : this.user._id,
      };
      this.tokenData =[];        
      this.completedToken =[];
      this.currentToken =[];
      this.upcommingToken=[];
        const url = this.global_service.basePath + 'ETH/getTokenByUserId?page='+value;
          this.global_service.PostRequest(url , postData).subscribe(response=>{ 
             if(response[0].json.status==200){
                this.tokenData=response[0].json.json().data;               
                if(response[0].json.json().data.length)
                {
                  for(var i=0;i<this.tokenData.length;i++){ 
                  //this.j=i;                     
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
                     crowedsaleAdress:'',
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
                     objData.crowedsaleAdress=this.tokenData[i].crowdsaleAddress;
                     
                      if(value=="ongoing"){
                       this.counterDemo(objData,i);
                       }   
                       if(value=="expire"){
                       this.makeCrowedSaleFinal(objData.crowedsaleAdress);
                       }                   
                     
             
                 }   

                        if(value=="ongoing"){
                              $('#loader1').hide();
                             this.currentToken=this.tokenData;
                             this.ongoing=true;
                             this.ongoingTokenStatus=false;
                            if(this.currentToken.length===6){
                                  this.seemoreOngoing=false; 
                             }
                            else if( this.ongoingsix > this.currentToken.length) {
                                    this.seemoreOngoing=false;                                                         
                             }else if(this.ongoingsix <this.currentToken.length) {
                                this.seemoreOngoing=true;
                                this.currentToken=this.currentToken.slice(0,this.ongoingsix);
                              }
                                              

                               }else if(value=="upcomming"){
                                  $('#loader2').hide();
                                  this.upcommingToken=this.tokenData;
                                  this.upcommings=true;
                                  this.upcommingTokenStatus=false;
                                 if(this.upcommingToken.length===6){
                                      this.seemoreUpcomming=false; 
                                 }
                                else if( this.upcommingsix > this.upcommingToken.length) {
                                        this.seemoreUpcomming=false;                                                         
                                 }else if(this.upcommingsix <this.upcommingToken.length) {
                                    this.seemoreUpcomming=true;
                                    this.upcommingToken=this.upcommingToken.slice(0,this.upcommingsix);
                                  }


                               }else if(value=="expire"){
                                  $('#loader3').hide();
                            // alert("this.tokenData"+this.cadd);
                            //this.makeCrowedSaleFinal(objData.crowedsaleAdress);
                             this.completedToken=this.tokenData;
                             this.complete=true;
                             this.completeTokenStatus=false;
                             if(this.completedToken.length===6){
                                  this.seemoreExpired=false; 
                             }
                            else if( this.completesix > this.completedToken.length) {
                                    this.seemoreExpired=false;                                                         
                             }else if(this.completesix <this.completedToken.length) {
                                this.seemoreExpired=true;
                                this.completedToken=this.completedToken.slice(0,this.completesix);
                              }

                               }

                    
                } else{
                          this.seemoreOngoing=false;
                          this.seemoreUpcomming=false;;
                          this.seemoreExpired=false;
                           if(value=="ongoing"){  
                           $('#loader1').hide();                           
                             this.ongoing=true;
                             this.ongoingTokenStatus=true;                             
                               }else if(value=="upcomming"){
                                 $('#loader2').hide();
                             this.upcommings=true;
                             this.upcommingTokenStatus=true;                             
                               }else if(value=="expire"){
                                 $('#loader3').hide();
                             this.complete=true;
                             this.completeTokenStatus=true;                             
                               }
                }
            }else{
             
            }
          })
       }

     counterDemo(objectData:any,i:any){                   
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
            var element = document.getElementById("demo5"+i);
              if(element){             
                 document.getElementById("demo5"+i).innerHTML = days + "d " + hours + "h "
              + minutes  + "m " + seconds + "s (GMT +5:30)";
              }
        // If the count down is over, write some text 
       
        if (distance < 0) {          
            clearInterval(this.x);
            var element = document.getElementById("demo5"+i);
            if(element){
                   document.getElementById("demo5"+i).innerHTML = "Crowdsale Completed";
            }
          }
        }, 1000);
      }

        // get completeICO

    getIncompleteICO(){
      let postData={
         userId:this.user._id
      }
      this.incompleteICO=[];
      const url = this.global_service.basePath + 'api/inCompleteICO';
      this.global_service.PostRequest(url,postData).subscribe(response=>{
         $('#loader4').hide();       
       
            if(response[0].json.status==200)
              {
                 let res =  response[0].json.json().data;
                 if(res.length!=0)
                {
                    for(var data of res[0].crowdsale.crowdsale)
                      {
                         this.totalTokenSupply = this.totalTokenSupply + parseInt(data.supply);                         
                     }

                     this.incompleteICO=response[0].json.json().data;

                     if( this.incompletesix < this.incompleteICO.length)
                     {
                        this.seemoreIncomplete=true;
                        this.incompleteICO=this.incompleteICO.slice(0,this.incompletesix);
                     }
                     else if( this.incompletesix > this.incompleteICO.length)
                       {
                         this.seemoreIncomplete=false;
                     }
                }
                  else
                  { 
                    this.seemoreIncomplete=false;
                    this.incompleteTokenStatus=true;

                  }
             }
               else
              {
               this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');
              }
            })
    }

    // get token name and token balance by KUNVAR SUINGH
// getTokenBalanceAndName(){
//      let postData ={
//                     Address:this.user.EthAddress,
//                     userId:this.user._id
//                    };
//        //for live            
//      // const url = this.global_service.basePath + 'ETH/getAllsendTokens';
//       //for local
//       const url = this.global_service.basePath + 'ETH/getRopstenTokenTransactions';
//       this.global_service.PostRequest(url , postData).subscribe(response=>{
//             if(response[0].json.status==200)
//               {
//                this.tokenBalanceList = [];
//                if(response[0].json.json().data){
//                  var result=response[0].json.json().data.tokens;

//                if(result){
//                  if(result.length!=0){
//                      this.tabeldata2=false;
//                      for(var i=0;i<result.length;i++){
//                         let objData ={
//                             sn :'',
//                             tokenAddress:'',
//                             tokenName:'',
//                             result:''
//                         };
//                         var j = i+1;

//                         objData.sn =j.toString();
//                         objData.tokenAddress=(result[i].tokenInfo.tokenAddress);
//                         objData.tokenName=(result[i].tokenInfo.name);
//                         objData.result=(result[i].balance/(Math.pow(10,result[i].tokenInfo.decimals))).toString();
//                         this.tokenBalanceList.push(objData);
//                      }
//                        $(document).ready( function () {
//                         $('#tabledata_id').DataTable({
//                            'pagingType': 'full_numbers',
//                            'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
//                            responsive: true,
//                            language: {
//                            search: '_INPUT_',
//                            searchPlaceholder: 'Search ..',
//                           }
//                         });
//                      });
//                    }
//                  }else{
//                  this.tabeldata2=true;
//                  }
//                 } 
//                }               
//             })
//     }
// gettoken name and token balance by gaurav
getTokenBalanceAndNameRopsten(){
     let postData ={
                    Address:this.user.EthAddress,
                    userId:this.user._id
                   };
     this.tabeldata2=true;
       //for live            
     // const url = this.global_service.basePath + 'ETH/getAllsendTokens';
      //for local
      const url = this.global_service.basePath + 'ETH/getRopstenTokenTransactions';
      this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200)
              {
                //debugger;
               this.tokenBalanceList = [];
               if(response[0].json.json().data){
                 var result=response[0].json.json().data;
               
                 if(result.length!=0){
                     this.tabeldata2=false;
                     for(var i=0;i<result.length;i++){
                        if(result[i].value != 0){
                          var obj = {
                              tokenName : result[i].tokenName,
                              value : result[i].value/Math.pow(10,result[i].tokenDecimal)
                            };
                        this.tokenBalanceList.push(obj);
                      }
                     }
                       $(document).ready( function () {
                        $('#tabledata_id').DataTable({
                           'pagingType': 'full_numbers',
                           'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                           responsive: true,
                           language: {
                           search: '_INPUT_',
                           searchPlaceholder: 'Search..',
                          }
                        });
                     });
                   }else{this.tabeldata2=true;}
                 
                } 
               }else{this.tabeldata2=false;}               
            })
    }
    // get token balance by address

    // getTokenBalanceByAddress(){
    //  let postData ={
    //                 ETHaddress:this.user.EthAddress,
    //                 userId:this.user._id
    //                };
    //   const url = this.global_service.basePath + 'ETH/getTokenBalanceByAddress';
    //   this.global_service.PostRequest(url , postData).subscribe(response=>{
    //         if(response[0].json.status==200)
    //           {
    //            this.tokenBalanceList = [];
    //            var result=response[0].json.json().data;
    //            if(result.length!=0){
    //              this.tabeldata2=false;
    //              for(var i=0;i<result.length;i++){
    //               let objData ={
    //                   sn :'',
    //                   tokenAddress:'',
    //                   result:''
    //               };
    //               var j = i+1;
    //               objData.sn =j.toString();
    //               objData.tokenAddress=(result[i].tokenAddress);
    //               objData.result=result[i].result;

    //              this.tokenBalanceList.push(objData);
    //              }
    //                $(document).ready( function () {
    //                 $('#tabledata_id').DataTable({
    //                    'pagingType': 'full_numbers',
    //                    'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
    //                    responsive: true,
    //                    language: {
    //                    search: '_INPUT_',
    //                    searchPlaceholder: 'Search records',
    //                   }
    //                 });
    //              });
    //           }else{
    //              this.tabeldata2=true;
    //           }
    //          }else{this.tabeldata2=false;}               
    //         })
    // }


    // Get Transaction By account 2nd tabel
    // getTransactionsByAccount(){
    //   this.tabeldata=true;
    //   let postData ={
    //              address:this.user.EthAddress,
    //              userId:this.user._id,
    //              startBlock:'',
    //              endBlock: ''
    //              };

    //       const url = this.global_service.basePath + 'ETH/getTransactionFromRopston';                   //getTransactionsByAccount';
    //       this.global_service.PostRequest(url , postData).subscribe(response=>{
    //            if(response[0].json.status==200){
    //            this.transactionData = [];
    //            if(response[0].json.json().data){
    //            var result=response[0].json.json().data;
    //            if(result.length!=0){
    //              this.tabeldata=false;
    //               for(var i=0;i<result.length;i++){
    //               let objData ={
    //                  sn :'',
    //                  hash:'',
    //                  value:''
    //               };

    //               var j = i+1;
    //               objData.sn =j.toString();
    //               objData.hash=(result[i].hash);
    //               objData.value=result[i].value;
    //               this.transactionData.push(objData);
    //           }
    //           $(document).ready( function () {
    //           $('#table_id').DataTable({
    //              'pagingType': 'full_numbers',
    //              'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
    //              responsive: true,
    //              language: {
    //              search: '_INPUT_',
    //              searchPlaceholder: 'Search ..',
    //             }
    //           });
    //          });
    //            }else{
    //              this.tabeldata=true;
    //            }
    //          }
    //          }             
    //      })
    //     }
//get transation in 2nd table by gaurav
 getTransactionsByAccountRopsten(){
      this.tabeldata=true;
      let postData ={
                 Address:this.user.EthAddress,
                 userId:this.user._id,                 
                 };
             //debugger;
          const url = this.global_service.basePath + 'ETH/getRopstenTransactionList';                   
          this.global_service.PostRequest(url , postData).subscribe(response=>{
               if(response[0].json.status==200){
               this.transactionData = [];
               if(response[0].json.json().data){
               var result=response[0].json.json().data;
               if(result.length!=0){
                 this.tabeldata=false;
                  for(var i=0;i<result.length;i++){
                  var obj = {
                    hash : result[i].hash,
                    value : result[i].value/Math.pow(10,18)
                  };
                 this.transactionData.push(obj);
              }
              $(document).ready( function () {
              $('#table_id').DataTable({
                 'pagingType': 'full_numbers',
                 'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                 responsive: true,
                 language: {
                 search: '_INPUT_',
                 searchPlaceholder: 'Search ..',
                }
              });
             });
               }else{
                 this.tabeldata=true;
               }
             }
             }             
         })
        }


    ngOnInit() {
         this.withdrawFormInit();
         this.tokenFormInit();
    }

    tokenInfo(){
      this.updateDetails = {
              tokenName: '',
              companyName: '',
              description:'',
              videoLink:'',
              twitterLink:'',
              facebookLink: '',
              websiteLink: '',
              editTokenImage:'',
              linkedinLink:'',
              team:[],
              linkedinname:'',
              designation:'',
              image:'',
              teamid:'',
              whitePaper:''
           }
       }


     tokenFormInit(){
      this.updateTokenForm = this.fb.group({
           'companyName': new FormControl('',Validators.required),
           'description': new FormControl('',Validators.required),
           'twitterLink': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),
           'videoLink': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),
           'facebookLink': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),
           'websiteLink': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),
           'editTokenImage': new FormControl(''),
           'linkedinLink': new FormControl('',Validators.compose([Validators.pattern(/^https?:\/\/[^\s]+$/)])),
           'linkedinname': new FormControl('') ,
           'designation': new FormControl('') ,
           'image': new FormControl('') ,
           'whitePaper': new FormControl('')
        });
    }

    getTokenInfoByTokenId(value:any){      
      this.ng4LoadingSpinnerService.show();
      this.updateTokenForm.reset();
      this.editToken_Id=value;
      this.teamInfo=false;
      this.editTokenInfo=true;
      let postData ={
                  userId: this.user._id,
                  tokenId:value
               };
           const url = this.global_service.basePath + 'Eth/getTokenInfoByTokenId';
           this.global_service.PostRequest(url , postData).subscribe(response=>{             
              this.ng4LoadingSpinnerService.hide();
            if(response[0].json.json().status==200){              
                var data = response[0].json.json().data;
                  if(!data.tokenImage)
                     this.updateDetails.editTokenImage="assets/img/No-preview.png";                   
                   else
                  this.updateDetails.editTokenImage=data.tokenImage;                    
                  this.updateDetails.companyName=data.generalInfo.companyName;
                  this.updateDetails.description=data.generalInfo.description;
                  this.updateDetails.videoLink=data.generalInfo.vedio;
                  this.updateDetails.websiteLink =data.generalInfo.website;
                  this.updateDetails.facebookLink=data.generalInfo.facebook;
                  this.updateDetails.twitterLink=data.generalInfo.twitter;
                  this.updateDetails.linkedinLink=data.generalInfo.linkedin;
                  if(data.generalInfo.team.length>0){
                 this.teamStatus=true;
                 this.updateDetails.team = data.generalInfo.team;
               }
               
               if(data.generalInfo.whitePaper){
                    this.whitepaperStatus=true;    
                    this.updateDetails.whitePaper=data.generalInfo.whitePaper;//this.domSanitizer.bypassSecurityTrustResourceUrl(this.tokenData.whitePaper.changingThisBreaksApplicationSecurity)
              }
            }else{
             this.global_service.showNotification('top','right','server error',4,'ti-cross');
            }
          })
    }



    updateTokenInfoByTokenId(){
              let postData ={
                   userId:  this.user._id,
                   tokenId: this.editToken_Id ,
                   companyName:this.updateDetails.companyName,
                   description:this.updateDetails.description,
                   vedio:this.updateDetails.videoLink,
                   website:this.updateDetails.websiteLink ,
                   facebook:this.updateDetails.facebookLink,
                   twitter:this.updateDetails.twitterLink,
                   linkedin:this.updateDetails.linkedinLink,
                   tokenImage:this.updateDetails.editTokenImage,
                   whitePaper:this.updateDetails.whitePaper
               };

           const url = this.global_service.basePath + 'ETH/updateTokenInformationByTokenId';
           this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].status==200){
              this.getToken("ongoing");
              this.updateTokenForm.reset();
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
             }else{
              this.updateTokenForm.reset();
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
            }
          })
    }

    _handleTokenImageChange(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = (e:any) => {
          this.selectedTeamImage = e.target.result;
          this.updateDetails.editTokenImage = this.selectedTeamImage;
        }
         reader.readAsDataURL(file)
   }

whitePaper(event){
    this.ng4LoadingSpinnerService.show();
   let reader = new FileReader();
   let file = event.target.files[0];
   reader.onloadend = (e:any) => {
     this.selectedWhitePaperImage = e.target.result;
     var whitePaperImage=this.selectedWhitePaperImage.split(',')[1]      
     let postData={
       image : whitePaperImage
     }
    const url=this.global_service.basePath + 'merchandise/imageUpload';
           this.global_service.PostRequest(url, postData).subscribe(response => {
             this.ng4LoadingSpinnerService.hide();
            if(response[0].status){
               if (response[0].json.json().statusCode == 200) {
                 var whitePaperDataAfterupload=response[0].json.json().data;                  
                 this.updateDetails.whitePaper = whitePaperDataAfterupload;
                 this.whitepaperStatus=true;
                }else{
                  this.global_service.showNotification('top','right',"SOmething went wrong",4,'ti-cross');
                }
            }
       })    
   
     //this.tokImage=true;
   }
    reader.readAsDataURL(file)
  }
//call when in incomplete state
delete_tokenIncomplete(value:any){
this.deleteTokenid=value;
  $('#incompleteAlertModal1').modal('show');
}
//call in case of ongoing upcomming andexpired

deleteTokenThree(value:any){
this.deleteTokenid=value;
  $('#noticeModalinvest_delete').modal('show');
}

    deleteToken(){
       let postData ={
                 userId : this.user._id,
                 tokenId: this.deleteTokenid
               };
            this.ng4LoadingSpinnerService.show();
            const url = this.global_service.basePath + 'Eth/tokenDeletedByTokenId';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
               this.ng4LoadingSpinnerService.hide();
            if(response[0].json.status==200){
               this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
               if(this.ongoing){this.Ongoing();}
               if(this.upcommings){this.upcomming();}
               if(this.complete){this.Completed();}               
            }else{
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
            }
          })
    }

    deleteIncompleteToken(value:any){
      let postData ={
                 userId : this.user._id,
                 icoId: this.deleteTokenid
               };
            this.ng4LoadingSpinnerService.show();
            const url = this.global_service.basePath + 'api/deletedCompleteICO';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
               this.ng4LoadingSpinnerService.hide();
            if(response[0].json.status==200){
               this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
               this.InCompleted();
            }else{
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
            }
          })
    }

    sendTransaction() {
        let postData = {
            userId : this.user._id,
            fromAddress: this.user.EthAddress,
            toAddress:this.withdrawDetails.toAddress,
            amount: this.withdrawDetails.amount.toString(),
            password:this.withdrawDetails.password
        };
        const url = this.global_service.basePath + 'ETH/withdrawEth';
        this.global_service.PostRequest(url, postData).subscribe(response => {
            if (response[0].json.json().status == 200) {
              this.global_service.showNotification('top','right',"ETH withdraw successfully",2,'ti-cross');
              this.getBalance();
              //this.getTokenBalanceByAddress();
             // this.getTransactionsByAccount();
              //2ndtable
               this.getTransactionsByAccountRopsten();
              this.withDrawForm.reset();
             } else
              {
                this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                this.withDrawForm.reset();
                this.withdrawDialog = false;
              }
        })
    }

   showTeamDesc(teamId:any){
        this.teamInfo=true;
        var index = this.updateDetails.team.findIndex(function(o){
        return o._id === teamId;
    })
      ;
    if (index !== -1){
      var team = this.updateDetails.team[index];
      this.updateDetails.linkedinname = team.linkedinname;
      this.updateDetails.designation = team.designation;
      this.updateDetails.image = team.image;
      this.updateDetails.teamid=team._id
    }
   }

  saveTeamMembers(teamId:any){
       let postData ={
                 userId:  this.user._id,
                 tokenId: this.editToken_Id ,
                 teamId: teamId,
                 linkedinname:this.updateDetails.linkedinname,
                 designation:this.updateDetails.designation,
                 image:this.selectedTeamImage,
               };


           const url = this.global_service.basePath + 'Eth/updateTokenInformationByTokenId';
           this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].status==200){
              this.teamInfo=false;
              this.save=false;
              this.remove=true;
              this.inputDescr=false;
              this.inputLinkedName=false;
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
             }else{
              this.save=false;
              this.remove=true;
              this.inputDescr=false;
              this.inputLinkedName=false;
              this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
            }
          })

      }

  removeTeamMembers(teamId:any){
       let postData ={
                 userId : this.user._id,
                 teamId: teamId,
                 tokenId: this.editToken_Id
               };
           const url = this.global_service.basePath + 'Eth/deleteTeamInfoByTeamId';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
             this.teamInfo=false;
              var index = this.updateDetails.team.findIndex(function(o){
                    return o._id === teamId;
             });
              if (index !== -1){
                    this.updateDetails.team.splice(index, 1);
              }
            }
          })
    }

   teamImageUpload(event){
     this.save=true;
     this.remove=false;
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
             if(response[0].status){
                if (response[0].json.json().statusCode == 200) {
                  var teamImage=response[0].json.json().data;                  
                  this.updateDetails.image = teamImage;
                    }else{
                   this.global_service.showNotification('top','right',"SOmething went wrong",4,'ti-cross');
                 }
            }
      }) 
    }
     reader.readAsDataURL(file)
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
            if(this.ethBalance){
               this.ethBalance = this.ethBalance.toFixed(5);
              }           
            }else{
             this.ethBalance="NA";
            }
          })
    }

   getUserEthByUSD(amount:any){     
                    let postData = {
                    userId : this.user._id,
                    toAddress: this.user.EthAddress,
                    fromAddress: ico.companyETHaddress,
                    amount: amount.toString(),
                    password:ico.companyPassword
        };
                    
                  
      const url = this.global_service.basePath + 'ETH/withdrawEth';
      this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200)
              {
                this.getBalance();
               this.global_service.showNotification('top','right','You have recived '+amount,2,'ti-cross');
              }
               else
              {
               this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');
              }
            })
    }



    withdrawFormInit() {
        this.withDrawForm = this.fb.group({
          'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^.?(0|[0-9]\d*)(\.\d+)?$/)])),
            'toAddress': new FormControl('', Validators.required),
            'password':  new FormControl('', Validators.required)
        });
    }



      deposite() {
         this.depositDialog = true;
      }

      withdraw() {
         this.withdrawDialog = true;
      }




      onCancel() {
        this.withdrawDialog = false;
        this.withdrawFormInit();
      }

      cancelDeposite(){
       this.depositDialog=false;
      }
      teamdescr(){
         this.save=true;
         this.remove=false;
         this.inputDescr=true;

      }

      teamlinkdinName(){
        this.save=true;
        this.remove=false;
        this.inputLinkedName=true;
      }

      viewIco(value :any){
        window.open(this.global_service.basePathforReact+"invest?addr="+value);
      }
      
      depositeETHModal(){
        
        this.global_service.emitEvent("Dashbard Page", "click", "Deposit Button", 1);
        this.mymodel="" ;
        this.depositEth="" ;
        this.getEthereumFromUSD();
        $('#noticeModal').modal('show');
      }

      withdrawcall(){
        this.global_service.emitEvent("Dashbard Page", "Click", "Withdraw Button", 1);
        $('#noticeModal2').modal('show');
      }



      ngAfterViewInit() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
            responsive: true,
            language: {
            search: '_INPUT_',
            searchPlaceholder: 'Search ..',
            }

        });



         $('#datatables2').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search ..',
            }
        });


    }
    eventHandler(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 45 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
      }
    }
      eventHandler1(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 45 && e.keyCode < 58)
        || e.keyCode == 8)) {
          return false;
      }
    }
    
    clearWithdraw(){
     this.withDrawForm.reset();
    }
    public validateButton:boolean=false;
     addressValidate(add:any){
        
        let postData={
                     address:add,
        }
        const url = this.global_service.basePath + 'api/validateAddress';
            this.global_service.PostRequest(url, postData).subscribe(response => {
              let res=response;
              if(res[0].status==200){
                if(res[0].json.json().status==400){  
                 this.validateButton=true;               
                  this.global_service.showNotification('top','right',res[0].json.json().message,4,'ti-cross');
                  
                }else{
                  this.validateButton=false; 
                }
              }
            });
      }

}
