  import { Component, OnInit,NgModule,Injectable,AfterViewInit } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import * as moment from 'moment'; 
  import { GlobalService } from './../../../GlobalService';
  import { TableData } from './../../../md/md-table/md-table.component';
  import { DatePipe } from '@angular/common';  

  declare const $: any;
  declare const paypal: any;
   import  * as ico   from'./../../../ico_constant';
   import { Observable } from 'rxjs/Rx';
  declare interface DataTable {
   dataRows?: string[][];
  }



  @Component({
    selector: 'app-admin_Dashboard',
    templateUrl: './admin_Dashboard.component.html',
    styleUrls: ['./admin_Dashboard.component.css']
  })

  export class AdminDashboardComponent implements OnInit,AfterViewInit{
    public dataTable: DataTable;
    public tableData: TableData;
    user:any;
   investerLength:any[];
   businessLength:any[];
   userData:any[]=[];
   tabeldata2:boolean=true;


     constructor(public router:Router, public global_service:GlobalService){      
           this.user=JSON.parse(localStorage.getItem('currentUser')); 
              this.getAllUsers();

            $('#datatable111').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
            search: '_INPUT_',
            searchPlaceholder: 'Search by Type',
            }

        });
    }

    ngOnInit() {


    }

//fetching Users data from server
   getAllUsers(){
     this.investerLength=[];
     this.businessLength=[];
     this.userData=[];
     let postData ={
                 userId : this.user._id
                      };
     const url = this.global_service.basePath+'admin/getAllUser';
     this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
              console.log(JSON.stringify(response[0].json.json().data));
              if(response[0].json.json().data){
                   this.tabeldata2=false;
                 for(var data of response[0].json.json().data){
                   //debugger;
                   if(data.accountType!="Admin"){
                   this.userData.push(data);
                   }
                   if(data.accountType=="Investor"){
                  this.investerLength.push(data);
                   }
                  if(data.accountType=="Business"){
                  this.businessLength.push(data);
                   }
                  
                 }
                            $(document).ready( function () {
                        $('#tabledata_id').DataTable({
                           'pagingType': 'full_numbers',
                           'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                           responsive: true,
                           language: {
                           search: '_INPUT_',
                           searchPlaceholder: 'Search records',
                          }
                        });
                     });
              }else{
                this.tabeldata2=true;
              }
                      
            }
          });

   }
//on enable button
togle(id){
this.tabeldata2=true;
  let postData ={
                 userId :id
                      };
     const url = this.global_service.basePath+'admin/deleteUserByAdmin';
     this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.json().status==200){
          this.global_service.showNotification('top','right','User permission has been changed!.',2,'ti-cross');  
              this.getAllUsers();                               
            }
          });
}


    ngAfterViewInit() {
        $('#datatable111').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
            search: '_INPUT_',
            searchPlaceholder: 'Search by Type',
            }

        });

      
    }

}
