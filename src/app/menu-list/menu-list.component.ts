import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuData } from '../shared/menu-data.model';
import { MenuService } from '../shared/menu.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  displayedColumns = [
    'menuName',
    'startTime',
    'startDate',
    'endDate',
    'frequency',
    'createdBy',
    'createdOn',
  ];
  dataSource: MatTableDataSource<MenuData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data: MenuData[] = [];
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.data = this.menuService.getMenuItems();
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
