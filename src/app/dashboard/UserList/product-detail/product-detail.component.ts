 import { Component, OnInit,NgModule,Injectable } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import { GlobalService } from '../../../GlobalService';
  import { DomSanitizer } from '@angular/platform-browser';
  import { MessageService } from './../../../message.service';
  import {ImageZoomModule} from 'angular2-image-zoom';
  import * as moment from 'moment';
  import  * as CONST from '../../../ico_constant';
 import  * as ico   from'./../../../ico_constant';
  declare const paypal: any;
declare const $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  noProductStatus:boolean=false;
  ethAddress:any;
  ethBalance:any;
  amount:any=0;
  quantity:any=1;
  user:any;
  currentpassword:any;
  productsId:any;
  productData : any;
  prodQuant:any[]=[];
  prodsiz:any[]=[];
  productImage:any[]=[];
  productColour:any[]=[];
  zoomImg:any;
  submitForm:FormGroup;
  constructor(
  	private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
                private sanitizer:DomSanitizer,
                private productSend : MessageService

  	) {    
        var status = this.global_service.isLogedIn();
            if(status==false){
           this.router.navigateByUrl('/login');
                             }
     this.user=JSON.parse(localStorage.getItem('currentUser'));
                   if(this.user)
                   {
                   this.ethAddress=this.user.EthAddress;     
                   this.getBalance();
                  }
          

       this.activatedRoute.params.subscribe(params => {
            this.productsId = params["pid"];

        });
      if(this.productsId){
        this.getProductInfo(this.productsId);

      }
      
          $(document).ready( function () {
            //If your <ul> has the id "glasscase"
            $('#glasscase').glassCase({ 'thumbsPosition': 'bottom', 'widthDisplay' : 560});
        });
      }

// get product information by id
      getProductInfo(productIds:any){
       let postData = {
          productId : productIds,
       };
          const url = this.global_service.basePath + 'merchandise/getProductById';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
            let res = response[0].json.json();
            if(res.statusCode==200){
             this.productData = response[0].json.json().data[0];
             this.productImage=this.productData.images;
             this.productColour=this.productData.colour;
             this.zoomImg=this.productData.images[0];
             for(var i=1;i<=this.productData.quantity;i++){                
                       this.prodQuant.push(i);
                 }
             for(var i=1;i<=this.productData.size;i++){                
                   this.prodsiz.push(i);
                }
           }else{
             this.noProductStatus=true;
           }

             });           
           
      }
      
//change zooming image
        changeImg(img){
          this.zoomImg=img;
        } 

// get eth balance
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
                     this.ethBalance=0;
                    }
                  })
            }


//on select quantity
    selectQuantity(event){
      this.quantity=event.target.value;
    }


//on buy now
          buyNow(){ 
             this.global_service.emitEvent("Merchandise Page", "click",'buy now'+ " " +this.productData.name, 10); 
             this.amount=this.quantity*this.productData.price.toFixed(5);
             this.amount=this.amount.toFixed(5);
             if(this.amount<this.ethBalance){ 
             $('#checkoutmodal').modal('show');       
                }else{
            this.global_service.showNotification('top','right','Sorry you do not have sufficient balance',4,'ti-cross'); 
                }          
          }

//this function calls on password submit button
checkOutSubmit(currentpassword){   
let user=JSON.parse(localStorage.getItem("currentUser"));
let url=this.global_service.basePath+'api/verifyPassword';
let data={
  "userId" : user._id,
  "password" : currentpassword
}
  this.global_service.PostRequest(url,data).subscribe(response=>{
    if(response[0].json.json().status==200){
        let datas={
                  "fromAddress":user.EthAddress,
                  "toAddress":ico.companyETHaddress,
                  "amount":this.amount.toString(),
                  "password":currentpassword,
                  "product": [this.productData],
                  "user_id" :user._id,
                  "userId" :user._id

        }      
        console.log("datas"+JSON.stringify(datas));
      this.global_service.PostRequest(this.global_service.basePath+'ETH/purchaseProducts',datas).subscribe(response=>{        
        console.log(response[0].json.json().status);
         if(response[0].json.json().status==200){
           this.global_service.showNotification('top','right','Thankyou for shopping!.',2,'ti-cross'); 
           this.amount=0;  
           this.currentpassword='';
         }else{
           this.global_service.showNotification('top','right','Server error, Please try again!.',4,'ti-cross');
           this.amount=0;
           this.currentpassword='';
         }

        });
    }else{
      this.global_service.showNotification('top','right','Password is incorrect',4,'ti-cross');
      this.currentpassword='';
    }   

    });
};

            ngOnInit() {
                 this.submittForm();
                    }
                    
            submittForm(){
                this.submitForm = this.fb.group({
                      'currentPassword': new FormControl('',Validators.compose([Validators.required]))
                                   });
                   }


}
