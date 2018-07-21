import { Component, OnInit, AfterViewInit } from '@angular/core';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;

  constructor() { }

  ngOnInit() {
    this.dataTable = {
      headerRow: [ 'Sr', 'Date', 'Name', 'E-mail', 'Status', 'Phone','Kyc','2 factor','Bid/Ask','Balance','User Transt','Action','Report'],
      footerRow: [ 'Sr', 'Date', 'Name', 'E-mail', 'Status', 'Phone','Kyc','2 factor','Bid/Ask','Balance','User Transt','Action','Report' ],

      dataRows: [
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''],
          ['1','02-Jun-2018 11:48:17','skgp','chandra.getwebsoftware@gmail.com','','123-345-678','','','','','','',''] 
      ]
    };
  }


  ngAfterViewInit() {    
    $('#datatablesexchange').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
        responsive: true,
        language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
        }

    });

    const table = $('#datatablesexchange').DataTable();

    // Edit record
    table.on( 'click', '.edit', function () {
        const $tr = $(this).closest('tr');

        const data = table.row($tr).data();
        alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
    } );

    // Delete a record
    table.on( 'click', '.remove', function (e: any) {
        const $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
        e.preventDefault();
    } );

    // Like record
    table.on( 'click', '.like', function () {
        alert('You clicked on Like button');
    });
}
}