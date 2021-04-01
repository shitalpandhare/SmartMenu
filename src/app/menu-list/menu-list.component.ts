import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuData } from '../shared/menu-data.model';
import { MenuService } from '../shared/menu.service';
import { MatSort } from '@angular/material/sort';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

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

  data: MenuData[] = [];
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
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
}
