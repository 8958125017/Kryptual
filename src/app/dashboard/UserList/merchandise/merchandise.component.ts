import { ElementRef,Component, OnInit ,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../../../GlobalService';
import { Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './../../../message.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import  * as ico   from'./../../../ico_constant';

 declare const $: any;
@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.scss']
})
export class MerchandiseComponent implements OnInit {
 subscription: Subscription;
 heart:any;
 cartProduct :any[] = [];
 wishlist :any[] = [];
 priceArray:any=[];
 products:any;
 cpmETHAdd:any
 amount:any=0;
 finalTransaction:any;
 ethBalance:any;
 user:any;
 ethAddress:any;
 kryptualPoints:any;
 quanty:number =1;
 noProductStatus:boolean=false;
 currentpassword:any;
 submitForm:FormGroup;
  constructor(public global_service: GlobalService,public router: Router,private product : MessageService, private fb: FormBuilder) {
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
   this.marchandise();
   this.getPoints();
   // this.subscription = this.product.getMessage().subscribe(message => { 
   //                    if(message.product!="undefined") {    

   //                    this.addToCart(message.product);  

   //                    }
   //                 });
    this.cpmETHAdd = ico.companyETHaddress;
   $(document).click(function(){
  $("#dropdown").hide();
  $('.dropdown-menu').on('click', function(e) {
      if($(this).hasClass('dropdown-menu-form')) {
          e.stopPropagation();
      }
  });
});
   }

count(){
  this.amount=0;
  for(let i=0;i<this.priceArray.length;i++){
            this.amount=this.amount+this.priceArray[i];
      }
     this.amount=this.amount.toFixed(5); 
};

deleteCart(i){
  this.amount=this.amount-this.priceArray[i];
  this.cartProduct.splice(i,1); 
  this.priceArray.splice(i,1); 
  this.count();    
}
// when product detail add to cart button call

addToCart(product:any){


 this.global_service.emitEvent("Merchandise Page", "click",'Add to Cart'+ " " +product.name, 10); 
var index = this.cartProduct.findIndex(function(pro){
        return pro._id === product._id;
    });
    if (index !== -1){
      this.global_service.showNotification('top','right','Product already added',4,'ti-cross');      
    }else{
      this.cartProduct.push(product);
      this.priceArray.push(product.price);
     this.count(); 
       }      
};
//when click on checkout button
checkOut(){  
  if(this.cartProduct.length==0){
    this.global_service.showNotification('top','right','Your Shopping Cart Is Empty',4,'ti-cross');
     return;
  }else if(this.amount<this.ethBalance){    
      $('#checkoutmodal').modal('show');   
  }else{
    this.global_service.showNotification('top','right','Sorry You Do Not Have Sufficient Balance',4,'ti-cross'); 
  }  

};
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
                  "product": this.cartProduct,
                  "user_id" :user._id,
                  "userId" :user._id

        }     
     
      this.global_service.PostRequest(this.global_service.basePath+'ETH/purchaseProducts',datas).subscribe(response=>{        
      	  if(response[0].json.json().status==200){
           this.global_service.showNotification('top','right','Thankyou for shopping!.',2,'ti-cross'); 
           this.amount=0;  
           this.cartProduct=[];
           this.priceArray=[];
           this.getBalance();
           this.currentpassword='';
         }else{
           this.global_service.showNotification('top','right','Server error, Please try again!.',4,'ti-cross');
           this.amount=0;
           this.cartProduct=[];
           this.priceArray=[];
           this.currentpassword='';
         }

        });
    }else{
      this.global_service.showNotification('top','right','Password is incorrect',4,'ti-cross');
      this.currentpassword='';
    }   

    });
};
//fetching products from server
   marchandise(){
     $('#loader').show();
     const url = this.global_service.basePath+'merchandise/getProduct';
      $('#loader').hide();
     this.global_service.GetRequest(url).subscribe(response=>{ 
        $('#loader').hide();
       if(response[0].status==200){         
          if(response[0].json.data.length){
            this.products=response[0].json.data ? response[0].json.data : [];
          }else{
            $('#loader').hide();
            this.noProductStatus=true;
          }
       }else{
         $('#loader').hide();
         this.noProductStatus=true;
       }
      
     });
   }
   // ETH balance
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
//GET KP points
getPoints(){
               let postData ={
                 userId : this.user._id
               };
            const url = this.global_service.basePath + 'api/getKryptualPoints';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
            this.kryptualPoints=response[0].json.json().data;
            }else{
             this.kryptualPoints="0";
            }
          })
    }
    wishlistmodel(){     
                    if(this.wishlist.length==0)
                    {   
                      this.heart="card-header whthrt"; 
                      $('#whistlistmodal').modal('hide');      
                    }else{  
                    this.heart="card-header whthrt1";  
                        $('#whistlistmodal').modal('show');  
                            }         
                   }

   // when add on wish list button
wishList(product){
  this.global_service.emitEvent("Merchandise Page", "click",'buy now'+ " " +product.name, 10); 
var index = this.wishlist.findIndex(function(pro){
       return pro._id === product._id;
   });
   if (index !== -1){
     this.global_service.showNotification('top','right','Product already added',4,'ti-cross');
   }else{
     this.heart="card-header whthrt1";
     this.global_service.showNotification('top','right','Product added in wish list',2,'ti-cross');
     this.wishlist.push(product);
     
   }
}

//on delete wishlist products
deleteWishList(i){
this.wishlist.splice(i,1);
if(this.wishlist.length==0){
 $('#whistlistmodal').modal('hide');      
  this.heart="card-header whthrt";
     }
}

// when click on buy button
 buyNow(product){
    this.global_service.emitEvent("Merchandise Page", "click",'buy now'+ " " +product.name, 10); 
   this.amount=product.price;
   if(this.amount<this.ethBalance){ 
   $('#checkoutmodal').modal('show');     
      this.amount=product.price;  
  }else{
    this.global_service.showNotification('top','right','Sorry you do not have sufficient balance',4,'ti-cross'); 
  }  
  

 }

increseQuantity(i,maxQuantity){
  var qt = $('#'+i).val();
  var qtInt = parseInt(qt);
  $('#'+i).val(++qtInt);
  if(qtInt<=maxQuantity){
  this.priceArray[i]=this.priceArray[i]+this.cartProduct[i].price;
   this.count(); 
  }else{
  this.global_service.showNotification('top','right','Sorry you cannot exceed maximum quantity',4,'ti-cross');
  $('#'+i).val(--qtInt);
     this.count();
  }
}

decreseQuantity(i){
  var qt = $('#'+i).val();
  var qtInt = parseInt(qt);
    if(qtInt == 1){
     $('#'+i).val(1); 
    }else{
           $('#'+i).val(--qtInt);
           this.priceArray[i]=this.priceArray[i]-this.cartProduct[i].price;
           this.count();
         }
  
  }  

  ngOnInit() {
         this.submittForm();
         this.heart="card-header whthrt";
        }

  submittForm(){
    this.submitForm = this.fb.group({
          'currentPassword': new FormControl('',Validators.compose([Validators.required]))
                       });
       }


  Product_Detail(productId:any){
            $('#whistlistmodal').modal('hide');          
            this.router.navigate(['/dashboard/productdetail', { 'pid': productId }]);
            }

    

}
