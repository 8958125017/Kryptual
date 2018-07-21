import { Component, OnInit, AfterViewInit } from '@angular/core';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;


@Component({
  selector: 'app-feemanagement',
  templateUrl: './feemanagement.component.html',
  styleUrls: ['./feemanagement.component.css']
})
export class FeemanagementComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Sr', 'Market Name', 'Fee','Edit'],
      footerRow: ['Sr', 'Market Name', 'Fee','Edit'],

      dataRows: [
        ['1', 'BTC/ETH', '0.1'],
        ['2', 'BTC/ETH', '0.3'],
        ['3', 'BTC/ETH', '0.4'],
        ['4', 'BTC/ETH', '0.1'],
        ['5', 'BTC/ETH', '0.3'],
      ]
    };

  }

  ngAfterViewInit() {
    $("#datafeemanagement").DataTable({
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records"
      }
    });

    const table = $("#datafeemanagement").DataTable();

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
