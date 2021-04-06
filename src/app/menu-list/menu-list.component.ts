import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuData } from '../shared/menu-data.model';
import { MenuService } from '../shared/menu.service';
import { MatSort } from '@angular/material/sort';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  faTrash = faTrashAlt;
  faEdit = faEdit;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  displayedColumns = [
    'menuName',
    'startDate',
    'endDate',
    'frequency',
    'createdBy',
    'createdOn',
    'Action',
  ];
  dataSource: MatTableDataSource<MenuData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('tableMenuData') htmlData: ElementRef;

  data: MenuData[] = [];
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.updateModeEvent.next(false);
    console.log(new Date().getDay());
    this.menuService.updatedMenuItems.subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDeleteMenu(menuItemId: number) {
    console.log(menuItemId);
    this.menuService.deleteMenuItemById(menuItemId);
  }

  public downloadPDF(): void {
    const doc = new jsPDF();
    const columns = [
      [
        'Menu Special Name',
        'Start Date',
        '',
        'End Date',
        '',
        'Frequency',
        'Created By',
        'Created On',
      ],
    ];

    var prepare = [];
    for (let d of this.data) {
      var tempObj = [];
      tempObj.push(d.menuName);
      tempObj.push(d.startDate);
      tempObj.push(d.startTime);
      tempObj.push(d.endDate);
      tempObj.push(d.endTime);
      tempObj.push(d.frequency);
      tempObj.push(d.createdBy);
      tempObj.push(d.createdOn);
      prepare.push(tempObj);
    }
    autoTable(doc, {
      head: columns,
      body: prepare,
      didDrawPage: (dataArg) => {
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text('Menu Items', dataArg.settings.margin.left, 10);
      },
    });

    doc.save('menu-item.pdf');
  }
}
