import { Component, OnInit, AfterViewInit } from "@angular/core";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-fundmanagement',
  templateUrl: './fundmanagement.component.html',
  styleUrls: ['./fundmanagement.component.css']
})
export class FundmanagementComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;

  constructor() { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Sr', 'Currency Name', 'Freeze Balance', 'Total Volume', 'Accounts', 'Hot Balance', 'Balance Update', 'Cold Balance', 'Hot->Cold', 'Cold->Hot'],
      footerRow: ['Sr', 'Currency Name', 'Freeze Balance', 'Total Volume', 'Accounts', 'Hot Balance', 'Balance Update', 'Cold Balance', 'Hot->Cold', 'Cold->Hot'],

      dataRows: [
        ['1', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['2', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['3', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['4', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['5', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['6', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['7', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['8', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['9', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['10', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['12', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['13', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['14', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
        ['15', 'Bitcoin', '503.88682397', '503.88682397', 'admin', '32.48312917', '', '32.48312917', '', ''],
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
    table.on('click', '.edit', function () {
      const $tr = $(this).closest('tr');

      const data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });

    // Delete a record
    table.on('click', '.remove', function (e: any) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    // Like record
    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
  }
}